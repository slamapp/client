export const notificationType = {
  FOLLOW: "FOLLOW",
  LOUDSPEAKER: "LOUDSPEAKER",
} as const;

type NotificationTypeMap = typeof notificationType;

export type NotificationType = NotificationTypeMap[keyof NotificationTypeMap];
