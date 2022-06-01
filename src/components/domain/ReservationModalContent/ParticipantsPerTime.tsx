import styled from "@emotion/styled";

import Link from "next/link";
import { Avatar, Text } from "~/components/base";
import { getTimeFromIndex } from "~/utils/date";
import * as S from "./style";

const ParticipantsPerTime: React.FC<{ participantsPerBlock: any[] }> = ({
  participantsPerBlock,
}) => {
  return (
    <S.ContentWrapper>
      <Text>함께하는 사람</Text>
      {participantsPerBlock.map(({ index, users }: any) => (
        <ParticipantWithTimeWrapper key={index}>
          <span>{getTimeFromIndex(index)}</span>
          <S.AvatarGroup>
            {users &&
              users.map(({ userId, avatarImgSrc }: any) => (
                <Link href={`/user/${userId}`} key={userId} passHref>
                  <a>
                    <Avatar src={avatarImgSrc} shape="circle" size="md" />
                  </a>
                </Link>
              ))}
          </S.AvatarGroup>
        </ParticipantWithTimeWrapper>
      ))}
    </S.ContentWrapper>
  );
};

export default ParticipantsPerTime;

const ParticipantWithTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
