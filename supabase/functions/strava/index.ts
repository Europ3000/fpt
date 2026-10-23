// Strava for FPT: swaps the login code for tokens, keeps those tokens on the server and uploads finished workouts.
// Secrets (Edge Functions → Secrets): STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET.
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are present in every Edge Function by default.
// Turn "Verify JWT" off for this function: it checks the user itself, and "config" works without a login.
import { createClient } from "npm:@supabase/supabase-js@2";

const CID = Deno.env.get("STRAVA_CLIENT_ID") ?? "";
const SECRET = Deno.env.get("STRAVA_CLIENT_SECRET") ?? "";
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const out = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

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
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
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
    return out({ error: "action" }, 400);
  } catch (e) {
    return out({ error: "strava", detail: String(e) }, 502);
  }
});
