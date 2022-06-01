import type {
  APICommon,
  OmitAt,
  APIFollow,
  APILoudspeaker,
} from "~/domainTypes/tobe";

export type APINotification =
  | APINotificationFollow
  | APINotificationLoudspeaker;

interface APINotificationFollow extends DefaultNotification {
  type: "FOLLOW";
  follow: OmitAt<APIFollow>;
}

interface APINotificationLoudspeaker extends DefaultNotification {
  type: "LOUDSPEAKER";
  loudspeaker: OmitAt<APILoudspeaker>;
}
interface DefaultNotification extends APICommon {
  isRead: boolean;
  isClicked: boolean;
}
