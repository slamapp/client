import { request, authRequest, authFileRequest } from "../fetcher";
import type { ReservationApi } from "./type";

const reservationApi: ReservationApi = {
  getMyReservations: () => authRequest.get("/reservations/upcoming"),
  getMyUpcomingReservations: () => authRequest.get("/reservations/upcoming"),
  getMyExpiredReservations: (
    isFirst: boolean,
    lastId: number | undefined | null
  ) => {
    return lastId
      ? authRequest.get("/reservations/expired", {
          params: {
            isFirst,
            lastId,
            size: 2,
          },
        })
      : authRequest.get("/reservations/expired", {
          params: { isFirst, lastId: "0", size: 5 },
        });
  },
  getMyReservationParticipants: ({ courtId, startTime, endTime }) =>
    authRequest.get(`/reservations/${courtId}/${startTime}/${endTime}`),
  createReservation: (data) => authRequest.post("/reservations", data),
  updateReservation: (reservationId, data) =>
    authRequest.patch(`/reservations/${reservationId}`, data),
  deleteReservation: (reservationId) =>
    authRequest.delete(`/reservations/${reservationId}`),
};

export default reservationApi;
