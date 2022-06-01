import type { Reducer } from "react";
import dayjs from "dayjs";
import {
  TIME_TABLE_ROWS,
  getTimezoneIndexFromDatetime,
  MAX_RESERVATION_TIME_BLOCK_UNIT,
} from "~/utils/date";
import type { ActionTypeUnion } from "./actionTypes";
import { actionTypes } from "./actionTypes";

export type ReducerAction = {
  type: ActionTypeUnion;
  payload?: any;
};

const getTimeTableInfoFromReservations = (reservations: any, userId: any) => {
  const timeTable = Array.from({ length: TIME_TABLE_ROWS }, () => ({
    peopleCount: 0,
    ballCount: 0,
    users: [],
    hasReservation: false,
  }));

  return reservations.reduce(
    (acc: any, reservation: any) => {
      const { existedReservations, timeTable } = acc;
      const { startTime, endTime, reservationId, hasBall } = reservation;
      const startRow = getTimezoneIndexFromDatetime(startTime);
      const endRow =
        dayjs(startTime).date() !== dayjs(endTime).date()
          ? TIME_TABLE_ROWS
          : getTimezoneIndexFromDatetime(endTime);
      const hasReservation = reservation.userId === userId;

      if (hasReservation) {
        existedReservations.push({
          reservationId,
          startIndex: startRow,
          endIndex: endRow - 1,
          hasBall,
        });
      }

      for (let i = startRow; i < endRow; i += 1) {
        timeTable[i].peopleCount += 1;

        timeTable[i].ballCount = reservation.hasBall
          ? timeTable[i].ballCount + 1
          : timeTable[i].ballCount;

        timeTable[i].users.push({
          userId: reservation.userId,
          avatarImgSrc: reservation.avatarImgSrc,
        });

        timeTable[i].hasReservation = hasReservation;
      }

      return acc;
    },
    { timeTable, existedReservations: [] }
  );
};

export const initialState = {
  step: 1,
  mode: "create",
  startIndex: null,
  endIndex: null,
  timeTable: [],
  originalTimeTable: [],
  modalContentData: null,
  hasBall: false,
  existedReservations: [],
  selectedReservationId: null,
  requestDisabled: false,
  currentInput: "START",
  courtName: "",
};

export const reducer: Reducer<any, ReducerAction> = (
  state,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.SET_TIMETABLE: {
      const { reservations, userId, courtName, date } = payload;

      const { timeTable, existedReservations } =
        getTimeTableInfoFromReservations(reservations, userId);

      return {
        ...initialState,
        timeTable,
        originalTimeTable: timeTable,
        existedReservations,
        courtName,
        date,
      };
    }
    case actionTypes.START_CREATE: {
      return {
        ...state,
        modalContentData: [],
        mode: "create",
        step: state.step + 1,
        currentInput: "END",
      };
    }
    case actionTypes.START_UPDATE: {
      const { existedReservations, selectedReservationId } = state;
      const selectedReservation = existedReservations.find(
        ({ reservationId }: any) => reservationId === selectedReservationId
      );

      const { startIndex, endIndex, hasBall } = selectedReservation;

      return {
        ...state,
        step: state.step + 1,
        mode: "update",
        startIndex,
        endIndex,
        hasBall,
        selectedReservation,
      };
    }
    case actionTypes.DECREASE_STEP: {
      return {
        ...state,
        step: state.step - 1,
        endIndex: null,
        startIndex: null,
        selectedReservationId: null,
        timeTable: state.originalTimeTable,
        hasBall: false,
      };
    }
    case actionTypes.CLICK_BLOCK: {
      const { startIndex } = payload;

      return {
        ...state,
        startIndex,
        endIndex: null,
        selectedReservationId: null,
        selectedReservation: null,
        modalContentData: state.timeTable[startIndex].users,
      };
    }
    case actionTypes.SET_HAS_BALL: {
      const { hasBall } = payload;

      return {
        ...state,
        hasBall,
      };
    }
    case actionTypes.CLICK_RESERVATION_MARKER: {
      const { existedReservations, timeTable } = state;
      const { selectedReservationId } = payload;

      const selectedReservation = existedReservations.find(
        ({ reservationId }: any) => reservationId === selectedReservationId
      );

      const { startIndex, endIndex } = selectedReservation;
      const modalContentData = [];
      for (let i = startIndex; i <= endIndex; i += 1) {
        const { users } = timeTable[i];
        modalContentData.push({ index: i, users });
      }

      return {
        ...state,
        selectedReservationId,
        modalContentData,
        selectedReservation,
        startIndex: null,
      };
    }
    case actionTypes.SET_CURRENT_INPUT: {
      const { currentInput } = payload;

      return {
        ...state,
        currentInput,
      };
    }
    case actionTypes.SET_TIME_INDEX: {
      const { user } = payload;
      let { timeIndex } = payload;

      const {
        mode,
        originalTimeTable,
        endIndex,
        existedReservations,
        selectedReservationId,
        startIndex,
        hasBall,
      } = state;

      const timeTable = [...originalTimeTable];
      const selectedReservation = existedReservations.find(
        ({ reservationId }: any) => reservationId === selectedReservationId
      );

      const modalContentData = [];
      let requestDisabled = false;

      if (state.currentInput === "START") {
        if (endIndex === null) {
          return {
            ...state,
            startIndex: timeIndex,
          };
        }

        if (endIndex - timeIndex >= MAX_RESERVATION_TIME_BLOCK_UNIT) {
          console.log("3시간을 초과하여 예약할 수 없습니다.");
          timeIndex = endIndex - MAX_RESERVATION_TIME_BLOCK_UNIT + 1;
        }

        if (mode === "create") {
          if (timeIndex > endIndex) {
            return {
              ...state,
              startIndex: timeIndex,
              endIndex: null,
              currentInput: "END",
              timeTable: [...originalTimeTable],
            };
          }

          for (let i = timeIndex; i <= endIndex; i += 1) {
            const { users, peopleCount, hasReservation } = timeTable[i];

            timeTable[i] = {
              ...timeTable[i],
              users: hasReservation ? users : [...users, user],
              peopleCount: hasReservation ? peopleCount : peopleCount + 1,
            };

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (hasReservation) {
              requestDisabled = true;
            }
          }

          return {
            ...state,
            startIndex: timeIndex,
            timeTable,
            modalContentData,
            requestDisabled,
          };
        } else {
          if (timeIndex > endIndex) {
            for (
              let i = selectedReservation.startIndex;
              i <= selectedReservation.endIndex;
              i += 1
            ) {
              const { peopleCount, users, ballCount } = timeTable[i];

              timeTable[i] = {
                ...timeTable[i],
                peopleCount: peopleCount - 1,
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                ballCount: hasBall ? ballCount - 1 : ballCount,
              };
            }

            return {
              ...state,
              startIndex: timeIndex,
              endIndex: null,
              currentInput: "END",
              timeTable,
            };
          }

          if (endIndex < selectedReservation.endIndex) {
            for (let i = selectedReservation.endIndex; i > endIndex; i -= 1) {
              const { users, peopleCount, ballCount, hasReservation } =
                timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }
          }

          if (timeIndex > selectedReservation.startIndex) {
            for (
              let i = selectedReservation.startIndex;
              i < timeIndex;
              i += 1
            ) {
              const { users, peopleCount, ballCount, hasReservation } =
                timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }
          }

          for (let i = timeIndex; i <= endIndex; i += 1) {
            const { users, peopleCount, hasReservation, ballCount } =
              timeTable[i];

            if (
              i < selectedReservation.startIndex ||
              i > selectedReservation.endIndex
            ) {
              timeTable[i] = {
                ...timeTable[i],
                users: [...users, user],
                peopleCount: peopleCount + 1,
                ballCount: hasBall ? ballCount + 1 : ballCount,
              };
            }

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (
              (i < selectedReservation.startIndex ||
                i > selectedReservation.endIndex) &&
              hasReservation
            ) {
              requestDisabled = true;
            }
          }

          return {
            ...state,
            startIndex: timeIndex,
            requestDisabled,
            timeTable,
            modalContentData,
          };
        }
      } else {
        if (timeIndex - startIndex >= MAX_RESERVATION_TIME_BLOCK_UNIT) {
          console.log("3시간을 초과하여 예약할 수 없습니다.");
          timeIndex = startIndex + MAX_RESERVATION_TIME_BLOCK_UNIT - 1;
        }

        if (mode === "create") {
          if (timeIndex < startIndex) {
            return {
              ...state,
              startIndex: timeIndex,
              endIndex: null,
              currentInput: "END",
              timeTable: [...originalTimeTable],
            };
          }

          for (let i = startIndex; i <= timeIndex; i += 1) {
            const { users, peopleCount, hasReservation } = timeTable[i];

            timeTable[i] = {
              ...timeTable[i],
              users: hasReservation ? users : [...users, user],
              peopleCount: hasReservation ? peopleCount : peopleCount + 1,
            };

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (hasReservation) {
              requestDisabled = true;
            }
          }

          return {
            ...state,
            endIndex: timeIndex,
            timeTable,
            modalContentData,
            requestDisabled,
          };
        } else {
          if (timeIndex < startIndex) {
            for (
              let i = selectedReservation.startIndex;
              i <= selectedReservation.endIndex;
              i += 1
            ) {
              const { peopleCount, users, ballCount, hasReservation } =
                timeTable[i];

              timeTable[i] = {
                ...timeTable[i],
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }

            return {
              ...state,
              startIndex: timeIndex,
              endIndex: null,
              currentInput: "END",
              timeTable,
            };
          }

          if (selectedReservation.startIndex < startIndex) {
            for (
              let i = selectedReservation.startIndex;
              i < startIndex;
              i += 1
            ) {
              const { users, peopleCount, hasReservation, ballCount } =
                timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }
          }

          if (selectedReservation.endIndex - timeIndex > 0) {
            for (let i = selectedReservation.endIndex; i > timeIndex; i -= 1) {
              const { users, peopleCount, ballCount, hasReservation } =
                timeTable[i];
              timeTable[i] = {
                ...timeTable[i],
                users: users.filter(
                  ({ userId }: any) => userId !== selectedReservation.userId
                ),
                peopleCount: hasReservation ? peopleCount - 1 : peopleCount,
                ballCount:
                  hasReservation && hasBall ? ballCount - 1 : ballCount,
              };
            }
          }

          for (let i = startIndex; i <= timeIndex; i += 1) {
            const { users, peopleCount, hasReservation, ballCount } =
              timeTable[i];

            if (
              i < selectedReservation.startIndex ||
              i > selectedReservation.endIndex
            ) {
              timeTable[i] = {
                ...timeTable[i],
                users: [...users, user],
                peopleCount: peopleCount + 1,
                ballCount: hasBall ? ballCount + 1 : ballCount,
              };
            }

            modalContentData.push({ index: i, users: timeTable[i].users });

            if (
              (i < selectedReservation.startIndex ||
                i > selectedReservation.endIndex) &&
              hasReservation
            ) {
              requestDisabled = true;
            }
          }

          return {
            ...state,
            endIndex: timeIndex,
            requestDisabled,
            timeTable,
            modalContentData,
          };
        }
      }
    }

    default:
      return state;
  }
};
