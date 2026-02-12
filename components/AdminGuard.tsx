"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const syncMe = useMutation(api.users.syncMe);
  const me = useQuery(api.users.me);

  useEffect(() => {
    syncMe().catch(() => {});
  }, []);

  useEffect(() => {
    if (me === null) return;
    if (me && me.role !== "admin") router.replace("/");
  }, [me, router]);

  if (!me) return <div className="p-6">Loading...</div>;
  if (me.role !== "admin") return <div className="p-6">Redirecting...</div>;

  return <>{children}</>;
}
