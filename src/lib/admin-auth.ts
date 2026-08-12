import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

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
      const email = import.meta.env["VITE_ADMIN_EMAIL"] as string | undefined;
      const password = import.meta.env["VITE_ADMIN_PASSWORD"] as string | undefined;
      if (!email || !password) {
        if (!cancelled) {
          setError("Admin credentials are not configured.");
          setStatus("error");
        }
        return;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (cancelled) return;
      if (signInError) {
        setError(signInError.message);
        setStatus("error");
      } else {
        setStatus("ready");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { status, error };
}
