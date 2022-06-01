import type { ActionWithoutPayload, ActionWithPayload } from "~/contexts/type";
import type { APINotification, APIUser } from "~/domainTypes/tobe";

export type ActionUnion =
  | ActionWithPayload<
      "SET_CURRENT_USER",
      { user: APIUser; notifications: APINotification[] }
    >
  | ActionWithoutPayload<"CLEAR_CURRENT_USER">
  | ActionWithoutPayload<"LOADING_ON">
  | ActionWithoutPayload<"LOADING_OFF">
  | ActionWithPayload<
      "UPDATE_MY_PROFILE",
      Pick<APIUser, "nickname" | "positions" | "proficiency" | "description">
    >
  | ActionWithPayload<"SET_MY_PROFILE_IMAGE", Pick<APIUser, "profileImage">>
  | ActionWithPayload<"GET_MY_FAVORITES", any>
  | ActionWithPayload<"SET_MY_FAVORITES", any>
  | ActionWithPayload<"CREATE_FAVORITE", any>
  | ActionWithPayload<"DELETE_FAVORITE", any>
  | ActionWithPayload<
      "CONCAT_NOTIFICATIONS",
      { notifications: APINotification[]; lastId: any }
    >
  | ActionWithPayload<"UNSHIFT_NOTIFICATION", any>
  | ActionWithoutPayload<"READ_ALL_NOTIFICATIONS">
  | ActionWithPayload<"SET_MY_RESERVATIONS", any>;
