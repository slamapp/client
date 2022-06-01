import type { NextPage } from "next";
import Head from "next/head";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import type { APIFavorite } from "~/domainTypes/tobe";
import { withRouteGuard } from "~/hocs";
import favoriteAPI from "~/service/favoriteApi";
import { useAuthContext, useNavigationContext } from "~/contexts/hooks";
import { FavoriteList } from "~/components/domain";

const Home: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage("PAGE_FAVORITES");

  const { authProps } = useAuthContext();
  const { userId } = authProps.currentUser;

  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<
    {
      favoriteId: APIFavorite["id"];
      courtId: APIFavorite["court"]["id"];
      courtName: APIFavorite["court"]["name"];
      latitude: APIFavorite["court"]["latitude"];
      longitude: APIFavorite["court"]["longitude"];
    }[]
  >([]);

  const getPageFavorites = async () => {
    try {
      const {
        data: { favorites },
      } = await favoriteAPI.getMyFavorites();
      setFavorites(favorites);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getPageFavorites();
    }
  }, [userId]);

  return (
    <PageContainer>
      <Head>
        <title>Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <FavoriteList isLoading={isLoading} favorites={favorites} />
    </PageContainer>
  );
};

export default withRouteGuard("private", Home);

const PageContainer = styled.div`
  flex: 1;
  margin: 0 ${({ theme }) => theme.gaps.base};
`;
