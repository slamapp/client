import { useEffect, useState, useCallback } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import type { AxiosError } from "axios"
import {
  ProfileFavoritesListItem,
  BasketballLoading,
} from "~/components/domains"
import { Text, Button, Spacer } from "~/components/uis/atoms"
import { Label, Chip, Avatar } from "~/components/uis/molecules"
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants"
import {
  useNavigationContext,
  useAuthContext,
  useSocketContext,
} from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphicLayoutEffect"
import Custom404 from "~/pages/404"
import userApi from "~/service/userApi"
import type { APIFavorite, APIUser } from "~/types/domains"
import {
  getTranslatedPositions,
  getTranslatedProficiency,
} from "~/utils/userInfo"

interface ResponseUserProfile
  extends Pick<
    APIUser,
    "nickname" | "description" | "profileImage" | "proficiency" | "positions"
  > {
  userId: APIUser["id"]
  followerCount: number
  followingCount: number
}

const User: NextPage = () => {
  const { useMountPage, setNavigationTitle } = useNavigationContext()
  const { sendFollow, sendFollowCancel } = useSocketContext()
  const { authProps } = useAuthContext()

  useMountPage("PAGE_USER")

  const { query } = useRouter()
  const { userId: stringQueryUserId } = query

  const [isMe, setIsMe] = useState(false)
  const [pageUserInfo, setPageUserInfo] = useState<ResponseUserProfile | null>(
    null
  )
  const [pageFavorites, setPageFavorites] = useState<APIFavorite[]>([])
  const [isFollowing, setIsFollowing] = useState(false)

  const [isError, setIsError] = useState(false)

  const getMyProfile = useCallback(async () => {
    try {
      setPageFavorites([...authProps.favorites])

      const {
        data: { followerCount, followingCount, user },
      } = await userApi.getMyProfile()

      setPageUserInfo({
        description: user.description,
        followerCount,
        followingCount,
        nickname: user.nickname,
        positions: user.positions,
        proficiency: user.proficiency,
        profileImage: user.profileImage,
        userId: user.id,
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const getOtherProfile = useCallback(async () => {
    try {
      const { data } = await userApi.getUserProfile(`${stringQueryUserId}`)
      setPageUserInfo(data)
      setIsFollowing(data.isFollowing)
      // TODO: ???????????? API????????? ?????? ?????? ????????? ??????!
      // setPageFavorites([...data.favorites]);
    } catch (error) {
      console.error(error)
      const { message } = error as AxiosError
      if (message === "Entity Not Found") {
        setIsError(true)
      }
    }
  }, [stringQueryUserId])

  const handleClickFollow = (prevIsFollowing: boolean) => {
    if (pageUserInfo) {
      if (prevIsFollowing) {
        sendFollowCancel({ receiverId: pageUserInfo.userId })
      } else {
        sendFollow({ receiverId: pageUserInfo.userId })
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
      )
      setIsFollowing((prev) => !prev)
    }
  }

  useIsomorphicLayoutEffect(() => {
    setNavigationTitle(`${pageUserInfo?.nickname}`)
  }, [pageUserInfo?.nickname, setNavigationTitle])

  useEffect(() => {
    if (stringQueryUserId && authProps.currentUser) {
      if (stringQueryUserId === authProps.currentUser.id) {
        setIsMe(true)
        getMyProfile()
      } else {
        getOtherProfile()
      }
    }
  }, [authProps.currentUser, getMyProfile, getOtherProfile, stringQueryUserId])

  if (pageUserInfo === null) {
    if (isError) {
      return <Custom404 />
    }

    return <BasketballLoading />
  }

  if (!authProps.currentUser) {
    return null
  }

  const {
    nickname,
    profileImage,
    followingCount,
    followerCount,
    description,
    positions,
    proficiency,
  } = pageUserInfo

  return (
    <div>
      <Head>
        <title>{nickname}?????? ????????? | Slam - ?????? ?????? ???????????? ?????????</title>
        <meta name="description" content="???????????? ????????? ??? ?????????" />
      </Head>

      <MainInfoContainer>
        <MainInfoArea>
          <Avatar
            src={profileImage ?? DEFAULT_PROFILE_IMAGE_URL}
            shape="circle"
          />
          <StatBar>
            <div>
              <Link href={`/user/${authProps.currentUser.id}/following`}>
                <a>
                  <dt>?????????</dt>
                  <dd>
                    <Text strong>{followingCount}</Text>
                  </dd>
                </a>
              </Link>
            </div>
            <div>
              <Link href={`/user/${authProps.currentUser.id}/follower`}>
                <a>
                  <dt>?????????</dt>
                  <dd>
                    <Text strong>{followerCount}</Text>
                  </dd>
                </a>
              </Link>
            </div>
            <div>
              <dt>?????? ??????</dt>
              <dd
                onClick={() => alert("?????? ??????")}
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
            <Link href={`/chat/${authProps.currentUser.id}`} passHref>
              <a style={{ width: "100%" }}>
                <Button fullWidth secondary>
                  ?????????
                </Button>
              </a>
            </Link>

            <Button
              fullWidth
              tertiary={isFollowing}
              onClick={() => handleClickFollow(isFollowing)}
            >
              {isFollowing ? `?????????` : `?????????`}
            </Button>
          </ButtonContainer>
        ) : (
          <div>
            <Link href="/user/edit" passHref>
              <a>
                <Button fullWidth secondary>
                  ????????? ??????
                </Button>
              </a>
            </Link>
          </div>
        )}
      </MainInfoContainer>

      <AdditionalInfoSpacer gap="base" type="vertical">
        <div>
          <Label>?????????</Label>
          <Spacer type="horizontal" gap="xs">
            {positions.length ? (
              getTranslatedPositions(positions).map(({ english, korean }) => (
                <Chip key={english} secondary>
                  {korean}
                </Chip>
              ))
            ) : (
              <Chip key="no_position" secondary>
                ????????? ???????????? ????????????
              </Chip>
            )}
          </Spacer>
        </div>
        <div>
          <Label>?????????</Label>
          <Chip secondary>
            {proficiency === null
              ? "??????"
              : getTranslatedProficiency(proficiency).korean}
          </Chip>
        </div>
        <div>
          <Label>{isMe ? "??????" : `${nickname}??????`} ???????????? ?????????</Label>
          {pageFavorites.length ? (
            pageFavorites.map(({ court }) => (
              <ProfileFavoritesListItem key={court.id} courtId={court.id}>
                {court.name}
              </ProfileFavoritesListItem>
            ))
          ) : (
            <Chip secondary>????????? ???????????? ????????????</Chip>
          )}
        </div>
      </AdditionalInfoSpacer>
    </div>
  )
}

export default withRouteGuard("private", User)

const MainInfoContainer = styled.div`
  ${({ theme }) => css`
    padding: ${theme.gaps.lg} ${theme.gaps.base} ${theme.gaps.md};
    transition: background 200ms;
  `}
`

const AdditionalInfoSpacer = styled(Spacer)`
  ${({ theme }) => css`
    padding: ${theme.gaps.md} ${theme.gaps.base};
  `}
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MainInfoArea = styled(FlexContainer)`
  ${({ theme }) => css`
    padding: 0 ${theme.gaps.xs};
  `}
`

const ButtonContainer = styled(FlexContainer)`
  ${({ theme }) => css`
    gap: 0 ${theme.gaps.xs};
  `}
`

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
`

const Description = styled.div`
  ${({ theme }) => css`
    margin: ${theme.gaps.md} 0;
    line-height: 1.4;
  `}
`
