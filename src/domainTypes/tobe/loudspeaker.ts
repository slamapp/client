import type {
  ISOString,
  OmitAt,
  APICommon,
  APICourt,
} from "~/domainTypes/tobe";

export interface APILoudspeaker extends APICommon {
  startTime: ISOString;
  court: OmitAt<APICourt>;
}
