import { useMemo } from "react";
import dayjs from "dayjs";
import { Spacer, Text } from "~/components/base";
import { week } from "~/utils/date";
import * as S from "./style";

interface Props {
  startDatetime: string;
  endDatetime: string;
}

const Datetime: React.FC<Props> = ({ startDatetime, endDatetime }) => {
  const startDate = useMemo(() => dayjs(startDatetime), [startDatetime]);
  const endDate = useMemo(() => dayjs(endDatetime), [endDatetime]);

  return (
    <S.SubHeaderArea>
      <Spacer gap="xxs" type="vertical">
        <Text strong>
          {startDate.format("YYYY년 MM월 DD일")} (
          <S.DayOfTheWeek index={startDate.day()}>
            {week[startDate.day()]}
          </S.DayOfTheWeek>
          )
        </Text>
        <Text strong>
          {startDate.format("HH:mm")} - {endDate.format("HH:mm")}
        </Text>
      </Spacer>
    </S.SubHeaderArea>
  );
};

export default Datetime;
