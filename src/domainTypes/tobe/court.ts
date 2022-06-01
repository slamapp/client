import type { APICommon } from "~/domainTypes/tobe";
import type { TextureKey } from "~/enums";

export interface APICourt extends APICommon {
  name: string;
  latitude: number;
  longitude: number;
  image: string | null;
  basketCount: number;
  texture: TextureKey;
}
