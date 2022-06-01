import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import type { APIFavorite } from "~/domainTypes/tobe";
import { Button, Spacer } from "~/components/base";
import CourtItem from "../CourtItem";
import NoItemMessage from "../NoItemMessage";

const SkeletonParagraph = dynamic(
  () => import("../../base/Skeleton/Paragraph"),
  { ssr: false }
);

interface Props {
  isLoading: boolean;
  favorites: {
    favoriteId: APIFavorite["id"];
    courtId: APIFavorite["court"]["id"];
    courtName: APIFavorite["court"]["name"];
    latitude: APIFavorite["court"]["latitude"];
    longitude: APIFavorite["court"]["longitude"];
  }[];
}
const FavoriteList = ({ isLoading, favorites }: Props) => {
  if (isLoading) {
    return (
      <Spacer gap="base" type="vertical">
        {[0, 1, 2].map((key) => (
          <FavoriteItem key={key}>
            <SkeletonParagraph
              line={4}
              fontSize={20}
              lineHeight={2.0}
              lineBreak={1}
            />
          </FavoriteItem>
        ))}
      </Spacer>
    );
  }

  if (favorites.length === 0) {
    return (
      <NoItemMessage
        title={"즐겨찾는 농구장이 없으시네요? 🤔"}
        type="favorite"
        description={"즐겨찾기하면 더 빠르게 예약하실 수 있어요"}
        buttonTitle={"즐겨찾는 농구장 등록하기"}
      />
    );
  }

  return (
    <Spacer
      gap="base"
      type="vertical"
      style={{
        marginTop: 56,
      }}
    >
      {favorites.map(
        ({ favoriteId, courtName, courtId, latitude, longitude }) => (
          <FavoriteItem key={favoriteId}>
            <Spacer gap="xs" type="vertical">
              <CourtItem.Header>{courtName}</CourtItem.Header>
              {/* <CourtItem.Address>{"주소 넣기"}</CourtItem.Address> */}
            </Spacer>

            <Actions gap="xs">
              <ActionsLeftButtons gap="xs">
                <CourtItem.FavoritesToggle courtId={courtId} />
                <CourtItem.Share
                  court={{ id: courtId, latitude, longitude, name: courtName }}
                />
                <CourtItem.ChatLink
                  chatroomId={
                    // TODO: Court에 chatroomId 포함시키기
                    "1"
                  }
                />
                <CourtItem.KakaoMapLink
                  latitude={latitude}
                  longitude={longitude}
                  courtName={courtName}
                />
              </ActionsLeftButtons>
              <Link href={`/courts?courtId=${courtId}`} passHref>
                <a style={{ flex: 1, display: "flex" }}>
                  <Button size="lg" style={{ flex: 1 }}>
                    예약하기
                  </Button>
                </a>
              </Link>
            </Actions>
          </FavoriteItem>
        )
      )}
    </Spacer>
  );
};

const Actions = styled(Spacer)`
  margin-top: 40px;
  flex-flow: row wrap;
`;

const ActionsLeftButtons = styled(Spacer)``;

const FavoriteItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadiuses.lg};
  padding: 20px;
`;

export default FavoriteList;
