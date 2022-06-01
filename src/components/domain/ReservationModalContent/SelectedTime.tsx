import { Text } from "~/components/base";
import * as S from "./style";

const SelectedTime: React.FC<{ timeSlot: string }> = ({ timeSlot }) => {
  return (
    <S.ContentWrapper>
      <Text>선택한 시간</Text>
      <S.TimeSlotText>{timeSlot}</S.TimeSlotText>
    </S.ContentWrapper>
  );
};

export default SelectedTime;
