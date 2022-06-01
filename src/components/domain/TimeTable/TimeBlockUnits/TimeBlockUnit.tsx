import { useCallback } from "react";
import { useReservationContext } from "~/contexts/hooks";
import { Text } from "~/components/base";
import {
  MAJOR_TIME_BLOCK_UNIT,
  ACTIVE_RESERVATION_COUNT,
  getTimeFromIndex,
} from "~/utils/date";
import * as S from "./style";
import type { TimeBlockUnitProps, Status } from "../type";
import Hour from "./Hour";

const getTimeSlotFromIndex = (index: number) =>
  `${getTimeFromIndex(index)} - ${getTimeFromIndex(index + 1)}`;

const TimeBlockUnit: React.FC<TimeBlockUnitProps> = ({
  index,
  height,
  reservationCount,
  ballCount,
  selected,
  hasReservation,
  disabled,
  onClick,
}) => {
  const {
    reservation: { step },
  } = useReservationContext();

  const isEven = index % 2 === 0;
  const hasBlackTopBorder = index % MAJOR_TIME_BLOCK_UNIT === 0;
  const hasBlackBottomBorder =
    index % MAJOR_TIME_BLOCK_UNIT === MAJOR_TIME_BLOCK_UNIT - 1;
  const status: Status =
    reservationCount === 0
      ? "none"
      : reservationCount >= ACTIVE_RESERVATION_COUNT
      ? "active"
      : "lack";

  return (
    <S.TimeBlockUnitWrapper
      height={height}
      isEven={isEven}
      hasBlackTopBorder={hasBlackTopBorder}
      hasBlackBottomBorder={hasBlackBottomBorder}
      disabled={disabled}
    >
      <S.HourColumn className="time-block__hour">
        {isEven ? <Hour hour={index / 2} /> : <S.HoursHorizontalDivider />}
      </S.HourColumn>
      <S.StatusColumn
        className="time-block__status"
        status={status}
        onClick={() => onClick(index)}
      >
        {selected && step === 1 && (
          <S.Selector hasReservation={hasReservation}>
            <span>{getTimeSlotFromIndex(index)}</span>
          </S.Selector>
        )}
      </S.StatusColumn>
      <S.VerticalDivider />
      <S.BallColumn className="time-block__ball">
        {status !== "none" && (
          <Text strong size={30} style={{ color: "inherit" }}>
            {ballCount !== 0 ? ballCount : "😭"}
          </Text>
        )}
      </S.BallColumn>
    </S.TimeBlockUnitWrapper>
  );
};

export default TimeBlockUnit;
