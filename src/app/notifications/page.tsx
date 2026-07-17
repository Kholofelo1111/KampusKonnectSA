"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((d) => setNotifications(d.notifications || []))
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-bold">
        <Bell className="h-7 w-7 text-kk-blue" />
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="rounded-xl border p-8 text-center text-gray-500">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`rounded-xl border p-4 ${
                n.read ? "bg-white" : "bg-blue-50"
              }`}
            >
              <h2 className="font-semibold">{n.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{n.message}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/"
          className="rounded-lg bg-kk-blue px-4 py-2 text-white"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
