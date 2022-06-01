import { useEffect, useState, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { AxiosError } from "axios";
import { withRouteGuard } from "~/hocs";
import type { APIFavorite, APIUser, APICourt } from "~/domainTypes/tobe";
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants";
import userApi from "~/service/userApi";
import {
  useNavigationContext,
  useAuthContext,
  useSocketContext,
} from "~/contexts/hooks";
import Custom404 from "~/pages/404";
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphicLayoutEffect";
import {
  getTranslatedPositions,
  getTranslatedProficiency,
} from "~/utils/userInfo";
import {
  ProfileFavoritesListItem,
  BasketballLoading,
} from "~/components/domain";
import { Avatar, Button, Label, Spacer, Chip, Text } from "~/components/base";

interface ResponseUserProfile
  extends Pick<
    APIUser,
    "nickname" | "description" | "profileImage" | "proficiency" | "positions"
  > {
  userId: APIUser["id"];
  followerCount: number;
  followingCount: number;
}

const User: NextPage = () => {
  const {
    navigationProps,
    useMountPage,
    setNavigationTitle,
    useDisableTopTransparent,
  } = useNavigationContext();
  const { sendFollow, sendFollowCancel } = useSocketContext();
  const { authProps } = useAuthContext();

  const { userId, favorites: myFavorites } = authProps.currentUser;

  useMountPage("PAGE_USER");
  useDisableTopTransparent();

  const { query } = useRouter();
  const { userId: stringQueryUserId } = query;

  const [isMe, setIsMe] = useState(false);
  const [pageUserInfo, setPageUserInfo] = useState<ResponseUserProfile | null>(
    null
  );
  const [pageFavorites, setPageFavorites] = useState<
    { id: APIFavorite["id"]; court: Pick<APICourt, "id" | "name"> }[]
  >([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const [isError, setIsError] = useState(false);

  const getMyProfile = useCallback(async () => {
    try {
      setPageFavorites([
        ...myFavorites.map(({ favoriteId, courtId, courtName }) => ({
          id: favoriteId,
          court: { id: courtId, name: courtName },
        })),
      ]);

      const {
        data: { followerCount, followingCount, user },
      } = await userApi.getMyProfile();

      setPageUserInfo({
        description: user.description,
        followerCount,
        followingCount,
        nickname: user.nickname,
        positions: user.positions,
        proficiency: user.proficiency,
        profileImage: user.profileImage,
        userId: user.id,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getOtherProfile = useCallback(async () => {
    try {
      const { data } = await userApi.getUserProfile(`${stringQueryUserId}`);
      setPageUserInfo(data);
      setIsFollowing(data.isFollowing);
      // TODO: 즐겨찾기 API수정시 주석 풀고 디버깅 필요!
      // setPageFavorites([...data.favorites]);
    } catch (error) {
      console.error(error);
      const { message } = error as AxiosError;
      if (message === "Entity Not Found") {
        setIsError(true);
      }
    }
  }, [stringQueryUserId]);

  const handleClickFollow = (prevIsFollowing: boolean) => {
    if (pageUserInfo) {
      if (prevIsFollowing) {
        sendFollowCancel({ receiverId: pageUserInfo.userId });
      } else {
        sendFollow({ receiverId: pageUserInfo.userId });
      }
      setPageUserInfo((prevState) =>
        prevState
          ? {
              ...prevState,
              followerCount: prevIsFollowing
                ? prevState.followerCount - 1
                : prevState.followerCount + 1,
            }
          : null
      );
      setIsFollowing((prev) => !prev);
    }
  };

  useIsomorphicLayoutEffect(() => {
    setNavigationTitle(`${pageUserInfo?.nickname}`);
  }, [pageUserInfo?.nickname, setNavigationTitle]);

  useEffect(() => {
    if (stringQueryUserId && userId) {
      if (stringQueryUserId === userId) {
        setIsMe(true);
        getMyProfile();
      } else {
        getOtherProfile();
      }
    }
  }, [userId, getMyProfile, getOtherProfile, stringQueryUserId]);

  if (pageUserInfo === null) {
    if (isError) {
      return <Custom404 />;
    }

    return <BasketballLoading />;
  }

  const {
    nickname,
    profileImage,
    followingCount,
    followerCount,
    description,
    positions,
    proficiency,
  } = pageUserInfo;

  return (
    <div>
      <Head>
        <title>{nickname}님의 프로필 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>

      <MainInfoContainer
        isBackgroundTransparent={navigationProps.isTopTransparent}
      >
        <MainInfoArea>
          <Avatar
            src={profileImage ?? DEFAULT_PROFILE_IMAGE_URL}
            shape="circle"
          />
          <StatBar>
            <div>
              <Link href={`/user/${userId}/following`}>
                <a>
                  <dt>팔로잉</dt>
                  <dd>
                    <Text strong>{followingCount}</Text>
                  </dd>
                </a>
              </Link>
            </div>
            <div>
              <Link href={`/user/${userId}/follower`}>
                <a>
                  <dt>팔로워</dt>
                  <dd>
                    <Text strong>{followerCount}</Text>
                  </dd>
                </a>
              </Link>
            </div>
            <div>
              <dt>평가 점수</dt>
              <dd
                onClick={() => alert("개발 예정")}
                style={{ cursor: "pointer" }}
              >
                6.3
              </dd>
            </div>
          </StatBar>
        </MainInfoArea>
        <Description>{description}</Description>
        {!isMe ? (
          <ButtonContainer>
            <Link href={`/chat/${userId}`} passHref>
              <a style={{ width: "100%" }}>
                <Button fullWidth secondary>
                  메시지
                </Button>
              </a>
            </Link>

            <Button
              fullWidth
              tertiary={isFollowing}
              onClick={() => handleClickFollow(isFollowing)}
            >
              {isFollowing ? `팔로잉` : `팔로우`}
            </Button>
          </ButtonContainer>
        ) : (
          <div>
            <Link href={`/user/edit`} passHref>
              <a>
                <Button fullWidth secondary>
                  프로필 편집
                </Button>
              </a>
            </Link>
          </div>
        )}
      </MainInfoContainer>

      <AdditionalInfoSpacer gap="base" type="vertical">
        <div>
          <Label>포지션</Label>
          <Spacer gap="xs">
            {positions.length ? (
              getTranslatedPositions(positions).map(({ english, korean }) => (
                <Chip key={english} secondary>
                  {korean}
                </Chip>
              ))
            ) : (
              <Chip key={"no_position"} secondary>
                선택한 포지션이 없습니다
              </Chip>
            )}
          </Spacer>
        </div>
        <div>
          <Label>숙련도</Label>
          <Chip secondary>{getTranslatedProficiency(proficiency).korean}</Chip>
        </div>
        <div>
          <Label>{isMe ? "내가" : `${nickname}님이`} 즐겨찾는 농구장</Label>
          {pageFavorites.length ? (
            pageFavorites.map(({ id, court }) => (
              <ProfileFavoritesListItem key={court.id} courtId={court.id}>
                {court.name}
              </ProfileFavoritesListItem>
            ))
          ) : (
            <Chip secondary>등록한 농구장이 없습니다</Chip>
          )}
        </div>
      </AdditionalInfoSpacer>
    </div>
  );
};

export default withRouteGuard("private", User);

const MainInfoContainer = styled.div<{ isBackgroundTransparent: boolean }>`
  ${({ theme, isBackgroundTransparent }) => css`
    padding: ${theme.gaps.lg} ${theme.gaps.base} ${theme.gaps.md};
    background: rgba(255, 255, 255, ${isBackgroundTransparent ? 0 : 1});
    transition: background 200ms;
  `}
`;

const AdditionalInfoSpacer = styled(Spacer)`
  ${({ theme }) => css`
    padding: ${theme.gaps.md} ${theme.gaps.base};
  `}
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainInfoArea = styled(FlexContainer)`
  ${({ theme }) => css`
    padding: 0 ${theme.gaps.xs};
  `}
`;

const ButtonContainer = styled(FlexContainer)`
  ${({ theme }) => css`
    gap: 0 ${theme.gaps.xs};
  `}
`;

const StatBar = styled.dl`
  ${({ theme }) => css`
    display: flex;
    text-align: center;
    margin: 0;
    flex-grow: 1;
    margin-left: ${theme.gaps.lg};
    justify-content: space-evenly;

    dd {
      box-sizing: border-box;
      margin: 0;
      font-weight: bold;
      padding: ${theme.gaps.xs} 0;
    }
  `}
`;

const Description = styled.div`
  ${({ theme }) => css`
    margin: ${theme.gaps.md} 0;
    line-height: 1.4;
  `}
`;
