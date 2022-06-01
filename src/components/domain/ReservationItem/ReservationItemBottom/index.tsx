import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import type { APICourt, APIReservation } from "~/domainTypes/tobe";
import { Button, Icon, Text } from "~/components/base";
import reservationAPI from "~/service/reservationApi";
import { useAuthContext } from "~/contexts/hooks";
import { UserListItem } from "~/components/domain";

interface Props {
  courtId: APICourt["id"];
  startTime: APIReservation["startTime"];
  endTime: APIReservation["endTime"];
  numberOfReservations: number;
  expired: any;
}

const ReservationItemBottom = ({
  courtId,
  startTime,
  endTime,
  numberOfReservations,
  expired,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [participants, setParticipants] = useState<{ [prop: string]: any }[]>(
    []
  );

  const handleClick = useCallback(async () => {
    setVisible((prev) => !prev);
    const { data } = await reservationAPI.getMyReservationParticipants({
      courtId,
      startTime,
      endTime,
    });
    const { participants } = data;
    setParticipants(participants);
  }, [courtId, startTime, endTime]);

  const { authProps } = useAuthContext();
  const { currentUser } = authProps;

  return (
    <>
      <Container>
        <ParticipantsToggle secondary onClick={handleClick}>
          <Icon name="users" size="sm" />
          <Text>{numberOfReservations}</Text>
        </ParticipantsToggle>
        {!expired && (
          <Link
            href={`courts/${courtId}/${startTime.substring(0, 10)}`}
            passHref
          >
            <Button>예약 확인하기</Button>
          </Link>
        )}
      </Container>
      {visible && (
        <ParticipantList>
          {currentUser.userId &&
            currentUser.nickname &&
            currentUser.profileImage && (
              <UserListItem
                user={{
                  id: currentUser.userId,
                  nickname: currentUser.nickname,
                  profileImage: currentUser.profileImage,
                }}
              >
                {currentUser.nickname}
              </UserListItem>
            )}
          {participants.map(
            ({ userId, nickname, profileImage, isFollowed }) => (
              <UserListItem
                key={userId}
                isFollowed={isFollowed}
                user={{ id: userId, nickname, profileImage }}
              >
                {nickname}
              </UserListItem>
            )
          )}
        </ParticipantList>
      )}
    </>
  );
};

const ParticipantsToggle = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid ${({ theme }) => theme.colors.gray200};
`;

const ParticipantList = styled.div`
  width: 100%;
  padding: 15px 20px;
  margin-top: ${({ theme }) => theme.gaps.base};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadiuses.md};

  background-color: ${({ theme }) => theme.colors.gray200};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ReservationItemBottom;
