import type { APIUser } from "~/domainTypes/tobe";

export interface APISend extends APICommon {
  sender: OmitAt<APIUser>;
}

export interface APICommon {
  id: string;
  createdAt: ISOString;
  updatedAt: ISOString;
}

export type ISOString = string;
export type OmitAt<T> = Omit<T, "createdAt" | "updatedAt">;
