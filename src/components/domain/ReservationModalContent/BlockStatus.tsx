import Link from "next/link";
import { Avatar, Text } from "~/components/base";
import { useReservationContext } from "~/contexts/hooks";
import BottomFixedButton from "../BottomFixedButton";
import * as S from "./style";

interface Props {
  startTime: string;
  endTime: string;
  participants: any[];
  availableReservation: boolean;
}

const BlockStatusContent = ({
  startTime,
  endTime,
  participants,
  availableReservation,
}: Props) => {
  const { handleStartCreate } = useReservationContext();

  return (
    <>
      <S.ModalContent>
        <S.ContentWrapper>
          <Text>선택한 시간</Text>
          <S.TimeSlotText>
            {startTime} - {endTime}
          </S.TimeSlotText>
        </S.ContentWrapper>
        <S.ContentWrapper>
          <Text>함께하는 사람들</Text>
          {participants.length === 0 && <Text>아직 참여자가 없습니다.</Text>}
          <S.AvatarGroup>
            {participants &&
              participants.map(({ userId, avatarImgSrc }: any) => (
                <Link key={userId} href={`/user/${userId}`} passHref>
                  <a>
                    <Avatar src={avatarImgSrc} shape="circle" size="lg" />
                  </a>
                </Link>
              ))}
          </S.AvatarGroup>
        </S.ContentWrapper>
      </S.ModalContent>
      {availableReservation && (
        <BottomFixedButton type="button" onClick={handleStartCreate} bottom={0}>
          선택한 {startTime}부터 예약하기
        </BottomFixedButton>
      )}
    </>
  );
};

export default BlockStatusContent;
