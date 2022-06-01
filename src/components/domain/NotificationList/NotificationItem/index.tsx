import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { LinkStrong, Spacer } from "~/components/base";
import type { APINotification } from "~/domainTypes/tobe";
import { CourtItem, ProfileAvatar } from "~/components/domain";

dayjs.extend(relativeTime);

interface Props {
  notification: APINotification;
}

const NotificationItem = ({ notification }: Props) => {
  const { createdAt, isClicked, isRead } = notification;
  const date = new Date(createdAt);
  const fromCreatedAt = dayjs(date).locale("ko").fromNow();

  return (
    <NotificationItemContainer type={notification.type}>
      <Spacer gap={6} style={{ alignItems: "center" }}>
        {getNotificationMarkUp({ date, notification })}
      </Spacer>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            height: 24,
          }}
        >
          <div
            style={{
              fontSize: 10,
            }}
          >
            {isRead ? "읽음" : "안 읽음"}
            {isClicked ? "확인 함" : "확인 안함"}
          </div>
          <div style={{ fontSize: 12 }}>{fromCreatedAt}</div>
        </div>
      </div>
    </NotificationItemContainer>
  );
};
export default NotificationItem;

const getNotificationMarkUp = ({
  date,
  notification,
}: {
  date: Date;
  notification: APINotification;
}) => {
  const dayFormatted = dayjs(date).format("YYYY-MM-DD");

  switch (notification.type) {
    case "FOLLOW": {
      const { sender } = notification.follow;

      return (
        <>
          <ProfileAvatar
            userId={sender.id}
            profileImage={sender.profileImage}
            nickname={sender.nickname}
          />
          <div>
            <LinkStrong href={`user/${sender.id}`}>
              {sender.nickname}
            </LinkStrong>
            님이 팔로우 했습니다
          </div>
        </>
      );
    }
    case "LOUDSPEAKER": {
      const { court } = notification.loudspeaker;

      return (
        <>
          <CourtItem.KakaoMapLink
            latitude={court.latitude}
            longitude={court.longitude}
            courtName={court.name}
            type="findRoad"
          />
          <div>
            <div>
              <LinkStrong href={`courts/${court.id}/${dayFormatted}`}>
                {`${court.name} (농구 골대 ${court.basketCount} 개)`}
              </LinkStrong>
              에서 함께 농구할 사람을 급하게 구하고 있습니다
            </div>
            <div>{court.image}</div>
          </div>
        </>
      );
    }

    default:
      break;
  }
};

const NotificationItemContainer = styled.div<{ type: APINotification["type"] }>`
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 12px;
  ${({ theme, type }) => css`
    background: ${type === "FOLLOW"
      ? theme.colors.white
      : theme.colors.activeGradientColor};
    color: ${type === "FOLLOW" ? theme.colors.gray900 : theme.colors.white};
    border-radius: ${theme.borderRadiuses.sm};
    box-shadow: ${theme.boxShadows.sm};
  `}
`;
