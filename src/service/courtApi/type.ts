import type { APICourt, APINewCourt } from "~/domainTypes/tobe";
import type { ApiPromise } from "~/service/type";
import type { SlotKeyUnion } from "~/components/domain";

export interface CourtApi {
  getCourtsByCoordsAndDate: (coordsAndDate: {
    date: string;
    startLatitude: APICourt["latitude"];
    startLongitude: APICourt["longitude"];
    endLatitude: APICourt["latitude"];
    endLongitude: APICourt["longitude"];
    time: SlotKeyUnion;
  }) => ApiPromise;
  createNewCourt: (
    courtData: Pick<
      APINewCourt,
      "longitude" | "latitude" | "image" | "texture" | "basketCount" | "name"
    >
  ) => ApiPromise<APINewCourt>;
  getCourtDetail: (
    courtId: APICourt["id"],
    date: string,
    time: string
  ) => ApiPromise;
  getAllCourtReservationsByDate: (
    courtId: APICourt["id"],
    date: string
  ) => ApiPromise;
}
