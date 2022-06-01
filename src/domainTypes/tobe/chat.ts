import type {
  APISend,
  APILoudspeaker,
  APIChatroom,
  OmitAt,
} from "~/domainTypes/tobe";
import type { ChatType } from "~/enums";

export interface APIChat extends APISend {
  text: ChatText;
  type: ChatType;
  loudspeaker?: OmitAt<APILoudspeaker>;
  chatroom: OmitAt<APIChatroom>;
}
type ChatText = string; // TODO: regex로 글자 수 제한하기
