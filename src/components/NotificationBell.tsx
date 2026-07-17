"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";

export default function NotificationBell() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!session?.user) return;

    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data) => {
        const notifications = data.notifications || [];
        setCount(notifications.filter((n: any) => !n.read).length);
      })
      .catch(() => {});
  }, [session]);

  if (!session?.user) return null;

  return (
    <Link
      href="/notifications"
      className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-kk-navy/5 hover:bg-kk-navy/10"
    >
      <Bell className="h-5 w-5 text-kk-navy" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
