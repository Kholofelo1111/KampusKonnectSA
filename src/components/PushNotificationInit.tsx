"use client";

import { useEffect } from "react";
import { registerForPushNotifications } from "@/lib/push-notifications";

export default function PushNotificationInit() {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return null;
}
