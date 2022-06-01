import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useResize } from "~/hooks";
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphicLayoutEffect";
import { useReservationContext } from "~/contexts/hooks";
import { Image, Spacer, Text } from "~/components/base";
import { getTimezoneIndexFromDate } from "~/utils/date";
import { TimeBlockUnit, ActionTimeBlockUnit, Header } from "./TimeBlockUnits";
import TimeRangeSelector from "./TimeRangeSelector";
import * as S from "./style";

const timeSlotIndexMap: { [key in string]: number } = {
  dawn: 0,
  morning: 12,
  afternoon: 24,
  night: 35,
};

interface Props {
  isToday: boolean;
  timeSlot: string;
  onModalOpen: () => void;
  onModalClose: () => void;
}

const TimeTable = ({ isToday, timeSlot, onModalOpen, onModalClose }: Props) => {
  const {
    reservation: {
      step,
      timeTable,
      startIndex,
      endIndex,
      existedReservations,
      selectedReservationId,
    },
    handleSelectReservation,
    handleSetCurrentBlock,
    handleSetTime,
  } = useReservationContext();

  const currentTimeIndex = useMemo(
    () => (isToday ? getTimezoneIndexFromDate(dayjs()) : null),
    [isToday]
  );

  const [isInitialized, setIsInitialized] = useState(false);
  const [height, setHeight] = useState(0);

  const ref = useResize<HTMLDivElement>((rect) => {
    setHeight(rect.width);
  });

  const handleClickBlock = useCallback(
    (index) => {
      onModalOpen();
      if (step === 1) {
        handleSetCurrentBlock(index);
      } else {
        handleSetTime(index);
      }
    },
    [step, handleSetCurrentBlock, handleSetTime, onModalOpen]
  );

  const handleClickReservationMarker = useCallback(
    (reservationId: number) => {
      if (step === 1) {
        onModalOpen();
        handleSelectReservation(reservationId);
      }
    },
    [step, onModalOpen, handleSelectReservation]
  );

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetWidth);
    }
  }, [ref]);

  useEffect(() => {
    if (height !== 0) {
      setIsInitialized(true);
    }
  }, [height]);

  useEffect(() => {
    const el = document.querySelector("#scrolled-container");

    if (timeSlot && el && isInitialized) {
      setTimeout(
        () =>
          el.scrollTo({
            left: 0,
            top: timeSlotIndexMap[timeSlot as string] * height,
            behavior: "smooth",
          }),
        200
      );
    }
  }, [isInitialized]);

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <Header />
      <S.TimeTableContainer>
        <ActionTimeBlockUnit
          rowRef={ref}
          height={height}
          previous
          disabled={isToday}
          onClose={onModalClose}
        />
        {timeTable.map((item: any, index: number) => (
          <TimeBlockUnit
            key={index}
            height={height}
            index={index}
            reservationCount={item.peopleCount}
            ballCount={item.ballCount}
            hasReservation={item.hasReservation}
            selected={startIndex === index}
            step={step}
            onClick={handleClickBlock}
            disabled={
              isToday &&
              currentTimeIndex !== null &&
              index < currentTimeIndex + 1
            }
          />
        ))}
        {step === 2 && (
          <TimeRangeSelector
            unit={height}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
        {existedReservations.map(
          ({ reservationId, startIndex, endIndex }: any) => (
            <>
              {step === 2 && selectedReservationId === reservationId ? null : (
                <S.ReservationMarker
                  key={reservationId}
                  width={height}
                  height={height * (endIndex - startIndex + 1)}
                  top={height * (startIndex + 1)}
                  left={height}
                  selected={reservationId === selectedReservationId}
                  onClick={() => handleClickReservationMarker(reservationId)}
                >
                  <Spacer
                    gap="xxs"
                    type="vertical"
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <ImageWrapper>
                      <Image
                        unoptimized
                        src="/assets/basketball/only_ball_500.gif"
                        alt="basketball"
                      />
                    </ImageWrapper>
                    <Label block strong>
                      내 예약
                    </Label>
                  </Spacer>
                </S.ReservationMarker>
              )}
            </>
          )
        )}
        <ActionTimeBlockUnit height={height} next onClose={onModalClose} />
      </S.TimeTableContainer>
    </div>
  );
};

export default TimeTable;

const Label = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
`;

const ImageWrapper = styled.div`
  width: 44px;
  height: 44px;

  img {
    width: 100%;
    height: 100%;
  }
`;
