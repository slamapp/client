import type { APICourt } from "~/domainTypes/tobe";
import type { StatusKey } from "~/enums";

export interface APINewCourt extends Omit<APICourt, "id"> {
  id: string;
  status: StatusKey;
}
