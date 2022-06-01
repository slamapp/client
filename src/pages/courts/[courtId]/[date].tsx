import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { courtApi } from "~/service";
import {
  useAuthContext,
  useNavigationContext,
  useReservationContext,
} from "~/contexts/hooks";

import { week, getTimeFromIndex, getIsOneHourLeft } from "~/utils/date";
import {
  TimeTable,
  ReservationModalContent as ModalContent,
  DayOfTheWeek,
} from "~/components/domain";
import { ModalSheet, Text } from "~/components/base";

const getIsPast = (date: string) => dayjs().isAfter(date, "day");

const Reservation: NextPage = () => {
  const router = useRouter();
  const {
    query: { courtId, date, timeSlot },
  } = router;

  const {
    authProps: { currentUser },
  } = useAuthContext();

  const {
    useMountPage,
    clearNavigationEvent,
    setCustomButtonEvent,
    setNavigationTitle,
  } = useNavigationContext();

  const {
    reservation,
    handleDecreaseStep,
    handleInitReservation,
    handleUpdateReservation,
    handleCreateReservation,
  } = useReservationContext();

  useMountPage("PAGE_COURT_RESERVATIONS");

  const {
    startIndex,
    endIndex,
    mode,
    step,
    timeTable,
    requestDisabled,
    selectedReservationId,
    selectedReservation,
    modalContentData,
    hasBall,
    currentInput,
  } = reservation;

  const [snap, setSnap] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (router.isReady && getIsPast(date as string)) {
      alert("과거의 예약 정보는 확인할 수 없습니다.");
      router.replace("/courts");
    }

    const el = document.querySelector("#scrolled-container");

    if (router.isReady && !timeSlot) {
      el!.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [router]);

  useEffect(() => {
    setNavigationTitle(<ReservationTitle date={date as string} />);
  }, [date, setNavigationTitle]);

  useEffect(() => {
    if (step > 1) {
      setCustomButtonEvent("취소", () => {
        handleClose();
        handleDecreaseStep();
      });
    } else {
      clearNavigationEvent();
    }

    return () => clearNavigationEvent();
  }, [
    step,
    clearNavigationEvent,
    setCustomButtonEvent,
    handleDecreaseStep,
    handleClose,
  ]);

  useEffect(() => {
    const initReservations = async () => {
      const {
        data: { reservations },
      } = await courtApi.getAllCourtReservationsByDate(`${courtId}`, `${date}`);

      const {
        data: { courtName },
      } = await courtApi.getCourtDetail(
        `${courtId}`,
        dayjs().format("YYYY-MM-DD"),
        "dawn"
      );
      handleInitReservation(reservations, courtName, date);
    };

    if (router.isReady && currentUser.userId) {
      initReservations();
    }
  }, [courtId, date, currentUser.userId, router, handleInitReservation]);

  return (
    <div>
      <TimeTable
        isToday={dayjs().isSame(date as string, "day")}
        timeSlot={timeSlot as string}
        onModalOpen={handleOpen}
        onModalClose={handleClose}
      />
      <ModalSheet
        isOpen={isOpen}
        onClose={handleClose}
        onSnap={(snap: number) => {
          setSnap(snap);
        }}
        onCloseStart={() => setSnap(-1)}
      >
        {step === 1 && startIndex !== null && modalContentData && (
          <ModalContent.BlockStatus
            startTime={getTimeFromIndex(startIndex)}
            endTime={getTimeFromIndex(startIndex + 1)}
            participants={modalContentData}
            availableReservation={!timeTable[startIndex].hasReservation}
          />
        )}

        {isOpen &&
          step === 1 &&
          selectedReservationId !== null &&
          modalContentData && (
            <ModalContent.ExistedReservation
              timeSlot={`${getTimeFromIndex(
                selectedReservation.startIndex
              )} - ${getTimeFromIndex(selectedReservation.endIndex + 1)}
              `}
              reservationId={selectedReservationId}
              participantsPerBlock={modalContentData}
              requestDisabled={getIsOneHourLeft(
                `${date} ${getTimeFromIndex(selectedReservation.startIndex)}`
              )}
            />
          )}
        {step === 2 && modalContentData && (
          <ModalContent.SelectedRange
            startTime={getTimeFromIndex(startIndex)}
            endTime={endIndex ? getTimeFromIndex(endIndex + 1) : null}
            currentInput={currentInput}
            participantsPerBlock={modalContentData}
            hasBall={hasBall}
            requestDisabled={requestDisabled}
            onSubmit={() =>
              mode === "create"
                ? handleCreateReservation(date, courtId, hasBall)
                : handleUpdateReservation(date, courtId, hasBall)
            }
            buttonText={
              mode === "create" ? "에 예약하기" : "으로 예약 수정하기"
            }
          />
        )}
      </ModalSheet>
      <div style={{ height: 320 }}></div>
    </div>
  );
};

export default Reservation;

const ReservationTitle: React.FC<{ date: string }> = ({ date }) => {
  const d = dayjs(date as string);

  return (
    <Text size="base">
      {d.format("YYYY년 MM월 DD일")} (
      <DayOfTheWeek index={d.day()} size="base">
        {week[d.day()]}
      </DayOfTheWeek>
      )
    </Text>
  );
};
