import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type GateSession = { admin?: boolean };

const sessionConfig = () => ({
  password: process.env.SESSION_SECRET!,
  name: "pm-vikas-admin",
  maxAge: 60 * 60 * 24 * 30,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
});

function matches(a: string, b: string): boolean {
  const x = createHash("sha256").update(a, "utf8").digest();
  const y = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(x, y);
}

export const checkAdmin = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<GateSession>(sessionConfig());
  return { admin: Boolean(session.data.admin) };
});

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return { ok: false as const, error: "Admin password is not configured." };
    }
    if (!data?.password || !matches(data.password, expected)) {
      return { ok: false as const, error: "Incorrect password." };
    }
    const session = await useSession<GateSession>(sessionConfig());
    await session.update({ admin: true });
    return { ok: true as const };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export async function requireAdmin() {
  const session = await useSession<GateSession>(sessionConfig());
  if (!session.data.admin) {
    throw new Error("Not authorized");
  }
}