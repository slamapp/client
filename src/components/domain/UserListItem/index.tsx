import React from "react";
import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { Button, Spacer, Text } from "~/components/base";
import { ProfileAvatar } from "~/components/domain";
import type { APIUser } from "~/domainTypes/tobe";
import { useSocketContext } from "~/contexts/hooks";

interface Props {
  className?: string;
  style?: CSSProperties;
  isFollowed?: boolean;
  user: Pick<APIUser, "id" | "nickname" | "profileImage">;
}
// 아바타 + 이름 + 버튼

const UserListItem: React.FC<Props> = ({
  className,
  style,
  isFollowed,
  user,
}) => {
  const { sendFollow, sendFollowCancel } = useSocketContext();

  const { id, nickname, profileImage } = user;

  return (
    <ListItem className={className} style={style}>
      <Spacer
        gap={10}
        style={{
          alignItems: "center",
        }}
      >
        <ProfileAvatar
          profileImage={profileImage}
          userId={id}
          nickname={nickname}
        />
        <Text size="base" strong>
          {nickname}
        </Text>
      </Spacer>
      <div>
        {isFollowed === undefined ? (
          <></>
        ) : isFollowed ? (
          <Button
            onClick={() => sendFollowCancel({ receiverId: user.id })}
            secondary
          >
            팔로잉
          </Button>
        ) : (
          <Button onClick={() => sendFollow({ receiverId: user.id })}>
            팔로우
          </Button>
        )}
      </div>
    </ListItem>
  );
};

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
`;

export default UserListItem;
