import type { APIReservation, APICourt } from "~/domainTypes/tobe";
import type { ApiPromise } from "~/service/type";

export interface ReservationApi {
  getMyReservations: () => ApiPromise;
  getMyUpcomingReservations: () => ApiPromise;
  getMyExpiredReservations: (
    isFirst: boolean,
    lastId: number | undefined | null
  ) => ApiPromise;
  getMyReservationParticipants: (props: {
    courtId: APICourt["id"];
    startTime: APIReservation["startTime"];
    endTime: APIReservation["endTime"];
  }) => ApiPromise<{ participants: { [prop: string]: any }[] }>;
  createReservation: (data: {
    courtId: APIReservation["court"]["id"];
    startTime: APIReservation["startTime"];
    endTime: APIReservation["endTime"];
    hasBall: boolean;
  }) => ApiPromise;
  updateReservation: (
    reservationId: APIReservation["id"],
    data: {
      startTime: APIReservation["startTime"];
      endTime: APIReservation["endTime"];
      hasBall: boolean;
    }
  ) => ApiPromise;
  deleteReservation: (reservationId: APIReservation["id"]) => ApiPromise;
}
