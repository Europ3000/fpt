// Strava for FPT: swaps the login code for tokens, keeps those tokens on the server, uploads finished workouts
// and hands the app your activities (also those Garmin Connect passes on to Strava) for the log.
// Secrets (Edge Functions → Secrets): STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET.
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are present in every Edge Function by default.
// Turn "Verify JWT" off for this function: it checks the user itself, and "config" works without a login.
// Only the app's own site may call it from a browser (optional secret FPT_ORIGINS: a comma-separated list, e.g. to add a test site).
import { createClient } from "npm:@supabase/supabase-js@2";

const CID = Deno.env.get("STRAVA_CLIENT_ID") ?? "";
const SECRET = Deno.env.get("STRAVA_CLIENT_SECRET") ?? "";
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const ORIGINS = (Deno.env.get("FPT_ORIGINS") ?? "https://europ3000.github.io").split(",").map((o) => o.trim()).filter(Boolean);
const cors = (origin: string) => ({
  "Access-Control-Allow-Origin": ORIGINS.includes(origin) ? origin : ORIGINS[0],
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

type Tok = { access_token: string; refresh_token: string; expires_at: number; athlete?: string };

async function oauth(params: Record<string, string>) {
  const r = await fetch("https://www.strava.com/oauth/token", { method: "POST", body: new URLSearchParams({ client_id: CID, client_secret: SECRET, ...params }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.message || "strava " + r.status);
  return j;
}
async function load(uid: string): Promise<Tok | null> {
  const { data } = await db.from("fpt_links").select("data").eq("user_id", uid).eq("provider", "strava").maybeSingle();
  return (data?.data as Tok) ?? null;
}
const save = (uid: string, t: Tok) => db.from("fpt_links").upsert({ user_id: uid, provider: "strava", data: t, updated_at: new Date().toISOString() });

// A token that still works for a while; null when access was withdrawn on strava.com.
async function fresh(uid: string) {
  let t = await load(uid);
  if (!t) return null;
  if (t.expires_at - 120 < Date.now() / 1000) {
    try {
      const j = await oauth({ grant_type: "refresh_token", refresh_token: t.refresh_token });
      t = { ...t, access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at };
      await save(uid, t);
    } catch {
      return null;
    }
  }
  return t;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin") ?? "", CORS = cors(origin);
  const out = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
  if (origin && !ORIGINS.includes(origin)) return out({ error: "origin" }, 403);
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return out({ error: "method" }, 405);
  const b = await req.json().catch(() => ({}));
  if (b.action === "config") return out({ client_id: CID && SECRET ? CID : null });

  const jwt = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  const { data } = await db.auth.getUser(jwt);
  const uid = data?.user?.id;
  if (!uid) return out({ error: "login" }, 401);

  try {
    if (b.action === "exchange") {
      const j = await oauth({ grant_type: "authorization_code", code: String(b.code || "") });
      const athlete = [j.athlete?.firstname, j.athlete?.lastname].filter(Boolean).join(" ");
      await save(uid, { access_token: j.access_token, refresh_token: j.refresh_token, expires_at: j.expires_at, athlete });
      return out({ athlete });
    }
    if (b.action === "status") {
      const t = await load(uid);
      return out({ linked: !!t, athlete: t?.athlete ?? "" });
    }
    if (b.action === "unlink") {
      const t = await load(uid);
      if (t) await fetch("https://www.strava.com/oauth/deauthorize", { method: "POST", body: new URLSearchParams({ access_token: t.access_token }) }).catch(() => {});
      await db.from("fpt_links").delete().eq("user_id", uid).eq("provider", "strava");
      return out({ ok: true });
    }
    if (b.action === "upload") {
      const t = await fresh(uid);
      if (!t) return out({ error: "unlinked" }, 409);
      const a = b.activity ?? {};
      const r = await fetch("https://www.strava.com/api/v3/activities", {
        method: "POST",
        headers: { Authorization: "Bearer " + t.access_token, "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(a.name || "Training").slice(0, 100),
          sport_type: String(a.sport_type || "WeightTraining"),
          start_date_local: String(a.start_date_local || new Date().toISOString()),
          elapsed_time: Math.max(60, Math.round(Number(a.elapsed_time) || 0)),
          description: String(a.description || "").slice(0, 2000),
          distance: Number(a.distance) || 0,
          trainer: a.trainer ? 1 : 0,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.status === 401) return out({ error: "unlinked" }, 409);
      if (!r.ok) return out({ error: "strava", detail: j.message || r.status }, 502);
      return out({ id: j.id });
    }
    // Your activities since `after` (unix seconds), e.g. runs that Garmin Connect passed on to Strava.
    // Needs the scope activity:read_all; an older link without it answers "scope".
    if (b.action === "activities") {
      const t = await fresh(uid);
      if (!t) return out({ error: "unlinked" }, 409);
      const H = { Authorization: "Bearer " + t.access_token };
      const after = Math.max(0, Math.floor(Number(b.after) || 0));
      const r = await fetch(`https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=30`, { headers: H });
      const list = await r.json().catch(() => []);
      if (r.status === 401 || r.status === 403) return out({ error: "scope" }, 409);
      if (!r.ok || !Array.isArray(list)) return out({ error: "strava", detail: r.status }, 502);
      const skip = new Set((Array.isArray(b.skip) ? b.skip : []).map(String));
      const acts = [];
      for (const a of list.filter((x) => !skip.has(String(x.id))).slice(0, 15)) {
        // The list leaves out calories and the device: those come with the activity itself.
        const d = await fetch(`https://www.strava.com/api/v3/activities/${a.id}`, { headers: H }).then((x) => x.ok ? x.json() : a).catch(() => a);
        acts.push({
          id: String(a.id), name: d.name || "", sport_type: d.sport_type || d.type || "", trainer: !!d.trainer,
          start_date: d.start_date, start_date_local: d.start_date_local,
          moving_time: d.moving_time || 0, elapsed_time: d.elapsed_time || 0, distance: d.distance || 0,
          elevation: d.total_elevation_gain || 0, average_speed: d.average_speed || 0, max_speed: d.max_speed || 0,
          average_heartrate: d.average_heartrate || 0, max_heartrate: d.max_heartrate || 0,
          average_cadence: d.average_cadence || 0, average_watts: d.average_watts || 0,
          calories: d.calories || d.kilojoules || 0, device_name: d.device_name || "", external_id: d.external_id || "",
        });
      }
      return out({ activities: acts });
    }
    return out({ error: "action" }, 400);
  } catch (e) {
    console.error(e);   // details only in the function's logs, not to the caller
    return out({ error: "strava" }, 502);
  }
});
