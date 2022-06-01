import type { APICommon, APICourt, APIUser, APIChat } from "~/domainTypes/tobe";
import type { ChatroomAdminType, ChatroomType } from "~/enums";

export type APIChatroom = APICourtChatroom | APIUsersChatroom;

export interface APICourtChatroom extends APICommon {
  admins: Admin[];
  type: ChatroomType;
  court: APICourt;
  participants: APIUser[];
  lastChat: APIChat;
}

export interface APIUsersChatroom extends APICommon {
  admins: Admin[];
  type: ChatroomType;
  participants: APIUser[];
  lastChat: APIChat;
}

interface Admin {
  id: APIUser["id"];
  type: ChatroomAdminType;
}
