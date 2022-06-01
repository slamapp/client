import { authRequest } from "../fetcher";
import type { ManagementApi } from "./type";

const managementAPI: ManagementApi = {
  getNewCourts: (status, isFirst, lastId) =>
    authRequest.get("/management/newCourts", {
      params: {
        status,
        isFirst,
        lastId: lastId ?? 0,
        size: 10,
      },
    }),
  acceptNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourt/accept", newCourtId),
  denyNewCourt: (newCourtId: number) =>
    authRequest.patch("/management/newCourt/deny", newCourtId),
};

export default managementAPI;
