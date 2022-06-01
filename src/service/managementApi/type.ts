import type { ApiPromise } from "~/service/type";
import type { APINewCourt } from "../../domainTypes/tobe/newCourt";

type OldNewCourt = Pick<
  APINewCourt,
  | "basketCount"
  | "createdAt"
  | "updatedAt"
  | "longitude"
  | "latitude"
  | "texture"
  | "status"
  | "image"
> & { newCourtId: number; courtName: string };
export interface ManagementApi {
  getNewCourts: (
    status: APINewCourt["status"],
    isFirst: boolean,
    lastId?: OldNewCourt["newCourtId"] | null
  ) => ApiPromise<{
    contents: OldNewCourt[];
    lastId: OldNewCourt["newCourtId"] | null;
  }>;
  acceptNewCourt: (
    newCourtId: OldNewCourt["newCourtId"]
  ) => ApiPromise<OldNewCourt>;
  denyNewCourt: (
    newCourtId: OldNewCourt["newCourtId"]
  ) => ApiPromise<OldNewCourt>;
}
