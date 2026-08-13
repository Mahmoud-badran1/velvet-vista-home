import { useEffect, useState } from "react";
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../integrations/supabase/client";
import type { Database } from "../integrations/supabase/types";

// Runs only on the server: the admin credentials never reach the client
// bundle, and only short-lived session tokens are sent back over the wire.
const adminSignIn = createServerFn({ method: "POST" }).handler(async () => {
  const SUPABASE_URL = process.env["SUPABASE_URL"];
  const SUPABASE_PUBLISHABLE_KEY = process.env["SUPABASE_PUBLISHABLE_KEY"];
  const ADMIN_EMAIL = process.env["ADMIN_EMAIL"];
  const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"];

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Admin sign-in is not configured.");
  }

  const serverClient = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await serverClient.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  if (error || !data.session) {
    throw new Error(error?.message ?? "Sign-in failed");
  }

  return {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  };
});

export function useAdminSession() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        if (!cancelled) setStatus("ready");
        return;
      }
      try {
        const tokens = await adminSignIn();
        const { error: setErr } = await supabase.auth.setSession(tokens);
        if (cancelled) return;
        if (setErr) {
          setError(setErr.message);
          setStatus("error");
        } else {
          setStatus("ready");
        }
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Sign-in failed");
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { status, error };
}
