import type { APISend, OmitAt, APIUser } from "~/domainTypes/tobe";

export interface APIFollow extends APISend {
  receiver: OmitAt<APIUser>;
}
