// Delete your FPT account: Strava is unlinked, every row in fpt_store and fpt_links goes, then the login itself.
// The app calls it from Instellingen → Account → Account verwijderen (Google Play requires that you can delete your account).
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are present in every Edge Function by default; "Verify JWT" may stay on.
// Only the app's own site may call it from a browser (optional secret FPT_ORIGINS: a comma-separated list).
import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const ORIGINS = (Deno.env.get("FPT_ORIGINS") ?? "https://fptfit.app,https://europ3000.github.io").split(",").map((o) => o.trim()).filter(Boolean);
const cors = (origin: string) => ({
  "Access-Control-Allow-Origin": ORIGINS.includes(origin) ? origin : ORIGINS[0],
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin") ?? "", CORS = cors(origin);
  const out = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
  if (origin && !ORIGINS.includes(origin)) return out({ error: "origin" }, 403);
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return out({ error: "method" }, 405);
  const b = await req.json().catch(() => ({}));
  if (b.action !== "delete") return out({ error: "action" }, 400);

  const jwt = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  const { data } = await db.auth.getUser(jwt);
  const uid = data?.user?.id;
  if (!uid) return out({ error: "login" }, 401);

  try {
    // Withdraw FPT's access on strava.com too (best effort: an expired token cannot; you can also do it on strava.com).
    const { data: link } = await db.from("fpt_links").select("data").eq("user_id", uid).eq("provider", "strava").maybeSingle();
    const token = (link?.data as { access_token?: string } | undefined)?.access_token;
    if (token) await fetch("https://www.strava.com/oauth/deauthorize", { method: "POST", body: new URLSearchParams({ access_token: token }) }).catch(() => {});
    // The tables also go with the user ("on delete cascade"); deleting them first makes sure nothing stays behind.
    for (const table of ["fpt_links", "fpt_store"]) {
      const { error } = await db.from(table).delete().eq("user_id", uid);
      if (error) throw error;
    }
    const { error } = await db.auth.admin.deleteUser(uid);
    if (error) throw error;
    return out({ ok: true });
  } catch (e) {
    console.error(e);   // details only in the function's logs
    return out({ error: "delete" }, 500);
  }
});
