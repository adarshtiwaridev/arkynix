import DashboardClient from "./DashboardClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

function getCookieFromHeader(header = "", name) {
  if (!header) return null;
  const pair = header
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(name + "="));
  return pair ? decodeURIComponent(pair.split("=")[1]) : null;
}

export default async function Page() {
  const headerStore = await headers(); // 👈 MUST await
  const cookieHeader = headerStore.get("cookie") || "";
  const token = getCookieFromHeader(cookieHeader, "auth_token");

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/login");
  }

  return <DashboardClient />;
}
