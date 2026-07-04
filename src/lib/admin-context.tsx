import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { checkAdmin, loginAdmin, logoutAdmin } from "@/lib/gate.functions";

type AdminCtx = {
  isAdmin: boolean;
  loading: boolean;
  login: (password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const Ctx = createContext<AdminCtx | null>(null);

const LS_KEY = "pm-vikas-admin-flag";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(LS_KEY) === "1";
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await checkAdmin();
      setIsAdmin(res.admin);
      if (typeof window !== "undefined") {
        if (res.admin) window.localStorage.setItem(LS_KEY, "1");
        else window.localStorage.removeItem(LS_KEY);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = useCallback(async (password: string) => {
    const res = await loginAdmin({ data: { password } });
    if (res.ok) {
      setIsAdmin(true);
      if (typeof window !== "undefined") window.localStorage.setItem(LS_KEY, "1");
      return { ok: true };
    }
    return { ok: false, error: (res as { error?: string }).error };
  }, []);

  const logout = useCallback(async () => {
    await logoutAdmin();
    setIsAdmin(false);
    if (typeof window !== "undefined") window.localStorage.removeItem(LS_KEY);
  }, []);

  return <Ctx.Provider value={{ isAdmin, loading, login, logout, refresh }}>{children}</Ctx.Provider>;
}

export function useAdmin() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdmin must be used within AdminProvider");
  return v;
}