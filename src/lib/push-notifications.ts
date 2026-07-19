import { Capacitor } from "@capacitor/core";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";
import {
  PushNotifications,
  Token,
  ActionPerformed,
} from "@capacitor/push-notifications";

export async function registerForPushNotifications() {
  if (!Capacitor.isNativePlatform()) return;

  let permission = await PushNotifications.checkPermissions();

  if (permission.receive === "prompt") {
    permission = await PushNotifications.requestPermissions();
  }

  if (permission.receive !== "granted") return;

  await PushNotifications.register();

  PushNotifications.addListener("registration", async (token: Token) => {
    console.log("FCM Token:", token.value);
    try {
      await FirebaseMessaging.subscribeToTopic({ topic: "all" });
    } catch (e) {
    }
    console.log("Subscribed to topic: all");

    fetch("/api/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.value,
      }),
    }).catch(console.error);
  });

  PushNotifications.addListener("registrationError", console.error);

  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification: ActionPerformed) => {
      console.log(notification);
    }
  );
}
