import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { getTimezoneDateStringFromDate } from "~/utils/date";
import * as S from "./style";
import type { ActionTimeBlockUnitProps } from "../type";
import Hour from "./Hour";

const getNextDay = (date: string) =>
  getTimezoneDateStringFromDate(dayjs(date).add(1, "day"));

const getPrevDay = (date: string) =>
  getTimezoneDateStringFromDate(dayjs(date).subtract(1, "day"));

const ActionTimeBlockUnit: React.FC<ActionTimeBlockUnitProps> = ({
  height,
  rowRef,
  previous,
  next,
  disabled,
  onClose,
}) => {
  const {
    query: { courtId, date },
  } = useRouter();

  return (
    <S.TimeBlockUnitWrapper
      height={height}
      isEven={next}
      previous={previous}
      next={next}
      disabled={disabled}
    >
      {next ? (
        <S.HourColumn className="time-block__hour">
          <Hour hour={24} />
        </S.HourColumn>
      ) : (
        <S.OneSixthColumn ref={rowRef} />
      )}
      <S.FourSixthColumn
        className="time-block__action"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!disabled && (
          <Link
            href={`/courts/${courtId}/${
              previous ? getPrevDay(date as string) : getNextDay(date as string)
            }`}
            passHref
          >
            <S.NavigationBlock onClick={onClose}>
              {previous ? "전 날 예약 보기" : "다음 날 예약보기"}
            </S.NavigationBlock>
          </Link>
        )}
      </S.FourSixthColumn>
      <S.VerticalDivider />
      <S.OneSixthColumn className="time-block__action" />
    </S.TimeBlockUnitWrapper>
  );
};

export default ActionTimeBlockUnit;
