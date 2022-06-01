import React, { useEffect, useMemo, useRef } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon, Badge } from "~/components/base";
import { useAuthContext, useNavigationContext } from "~/contexts/hooks";
import { useIntersectionObserver } from "~/hooks";
import { ProfileAvatar } from "~/components/domain";

const TopNavigation = () => {
  const sensorRef = useRef<HTMLDivElement>(null);

  const { authProps } = useAuthContext();
  const { userId, profileImage, notifications, nickname } =
    authProps.currentUser;

  const {
    navigationProps: {
      isBack,
      isNotifications,
      isProfile,
      title,
      isMenu,
      handleClickBack,
      customButton,
      isTopTransparent,
    },
    setIsTopTransparent,
  } = useNavigationContext();

  const router = useRouter();

  const handleDefaultBack = () => {
    router.back();
  };

  const entry = useIntersectionObserver(sensorRef, {});

  useEffect(() => {
    if (entry) {
      setIsTopTransparent(entry.isIntersecting);
    }
  }, [entry?.isIntersecting]);

  const unreadNotificationsCount = useMemo(
    () => notifications.reduce((acc, { isRead }) => acc + (isRead ? 0 : 1), 0),
    [notifications]
  );

  return (
    <>
      <Container isTransparent={isTopTransparent}>
        <Wrapper>
          <IconGroup>
            {isBack && (
              <CursorIcon
                name="chevron-left"
                size={24}
                onClick={handleClickBack || handleDefaultBack}
              />
            )}
          </IconGroup>
          <IconGroup>
            {isNotifications && (
              <Badge count={unreadNotificationsCount} dot={false} maxCount={10}>
                <Link href="/notifications" passHref>
                  <a>
                    <Icon name="bell" size={24} />
                  </a>
                </Link>
              </Badge>
            )}
            {isProfile && userId && nickname && (
              <ProfileAvatar
                nickname={nickname}
                profileImage={profileImage}
                userId={userId}
              />
            )}
            {isMenu && (
              <Link href={`/user/menu`} passHref>
                <a>
                  <Icon name="menu" size={24} />
                </a>
              </Link>
            )}

            {customButton && (
              <CustomButton onClick={customButton.handleClick}>
                {customButton.title}
              </CustomButton>
            )}
          </IconGroup>
        </Wrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
      </Container>
      <TopNavigationSensor ref={sensorRef} />
    </>
  );
};

export default TopNavigation;

const Container = styled.nav<{ isTransparent: boolean }>`
  z-index: 1000;
  position: sticky;
  top: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    height: 56px;
    background: ${({ theme }) => theme.colors.white};
    transition: opacity 200ms;
    opacity: ${({ isTransparent }) => (isTransparent ? 0 : 1)};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  display: block;
  width: 60%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 700;
  pointer-events: none;
`;

const IconGroup = styled.div`
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CursorIcon = styled(Icon)`
  cursor: pointer;
`;

const CustomButton = styled.div`
  padding: 12px;
  font-weight: 700;

  :hover {
    cursor: pointer;
  }
`;

const TopNavigationSensor = styled.div`
  position: absolute;
  min-height: 56px;
  width: 100%;
`;
