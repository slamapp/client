import React from "react";
import styled from "@emotion/styled";
import { Avatar, Spacer } from "@components/base";
import CourtItem from "../CourtItem";
import Loudspeaker from "./Loudspeaker";
import ReservationItemBottom from "./ReservationItemBottom";

interface ReserveList {
  reservationId: number;
  courtId: number;
  courtName: string;
  latitude: number;
  longitude: number;
  numberOfReservations: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

type ReserveLists = ReserveList[];

const UpcomingReservations = ({
  reservationId,
  courtId,
  startTime,
  endTime,
  courtName,
  numberOfReservations,
  latitude,
  longitude,
  expired,
}: any) => {
  return (
    <ReservationItem key={reservationId}>
      <HeaderContainer>
        <Spacer gap={10} type="vertical">
          <CourtItem.Header>{courtName}</CourtItem.Header>
          <CourtItem.Datetime endDatetime={endTime} startDatetime={startTime} />
        </Spacer>
      </HeaderContainer>

      <Actions gap="xs">
        <CourtItem.FavoritesToggle courtId={courtId} />
        <CourtItem.ShareButton />
        <CourtItem.ChatLink courtId={courtId} />
        <CourtItem.KakaoMapLink
          latitude={latitude}
          longitude={longitude}
          courtName={courtName}
          type="findRoad"
        />
      </Actions>
      <Spacer gap="xxs" type="vertical">
        <Loudspeaker
          startTime={startTime}
          courtId={courtId}
          reservationId={reservationId}
        />
        <ReservationItemBottom
          courtId={courtId}
          startTime={startTime}
          endTime={endTime}
          numberOfReservations={numberOfReservations}
          expired={expired}
        />
      </Spacer>
    </ReservationItem>
  );
};

export default UpcomingReservations;

const ReservationItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadiuses.md};
  padding: 20px;
`;

const Actions = styled(Spacer)`
  justify-content: flex-end;
  align-items: center;
  margin-top: ${({ theme }) => theme.gaps.sm};
  margin-bottom: ${({ theme }) => theme.gaps.base};
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
