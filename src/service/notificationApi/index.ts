import { request, authRequest, authFileRequest } from "../fetcher";
import type { NotificationApi } from "./type";

const notificationApi: NotificationApi = {
  getNotifications: ({ size = 3, lastId, isFirst = false }) =>
    authRequest.get("/notifications", {
      params: {
        size,
        lastId: lastId || 0,
        isFirst,
      },
    }),

  readAllNotifications: () => authRequest.put("/notifications/read"),
};

export default notificationApi;
