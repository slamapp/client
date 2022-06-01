import { useState, useCallback, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styled from "@emotion/styled";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { courtApi } from "~/service";
import type { APICourt, Coord } from "~/domainTypes/tobe";
import { useLocalToken } from "~/hooks/domain";
import { DEFAULT_POSITION, getCurrentLocation } from "~/utils/geolocation";
import {
  useAuthContext,
  useMapContext,
  useNavigationContext,
} from "~/contexts/hooks";
import {
  getTimezoneCurrentDate,
  getTimezoneDateStringFromDate,
} from "~/utils/date";
import {
  DatePicker,
  SlotPicker,
  BasketballMarker,
  Map,
  slotItems,
  CourtItem,
  LeadToLoginModal,
  BasketballLoading,
} from "~/components/domain";
import type { SlotKeyUnion } from "~/components/domain";
import { Button, ModalSheet, Spacer, Text } from "~/components/base";

interface Geocoder extends kakao.maps.services.Geocoder {
  coord2Address: (
    latitude: number,
    longitude: number,
    callback?: (result: any, status: any) => void
  ) => string;
}

const getSlotFromDate = (
  date: Dayjs,
  timezone = "Asia/Seoul"
): SlotKeyUnion => {
  date.tz(timezone);
  const hour = date.hour();
  let slot = "" as SlotKeyUnion;

  if (hour < 6) {
    slot = "dawn";
  } else if (hour < 12) {
    slot = "morning";
  } else if (hour < 18) {
    slot = "afternoon";
  } else if (hour <= 23) {
    slot = "night";
  }

  return slot;
};

const Courts: NextPage = () => {
  const router = useRouter();

  const { authProps } = useAuthContext();

  const { useMountPage, useDisableTopTransparent, useMountCustomButtonEvent } =
    useNavigationContext();

  const [localToken] = useLocalToken();

  useMountPage("PAGE_MAP");
  useDisableTopTransparent();

  const { map } = useMapContext();

  const currentDate = useMemo(() => getTimezoneCurrentDate(), []);

  const [courts, setCourts] = useState<any>();

  const [level, setLevel] = useState<number>(5);
  const [center, setCenter] = useState<Coord>(DEFAULT_POSITION);

  const [selectedDate, setSelectedDate] = useState<Dayjs>(currentDate);
  const [selectedSlot, setSelectedSlot] = useState<SlotKeyUnion>(() =>
    getSlotFromDate(dayjs())
  );

  // TODO: API 명세 나올 경우 any 수정해주기
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<any>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLeadToLoginModal, setIsOpenLeadToLoginModal] = useState(false);

  useMountCustomButtonEvent("추가", () => {
    if (localToken) {
      router.push("/courts/create");
    } else {
      setIsOpenLeadToLoginModal(true);
    }
  });

  const [snap, setSnap] = useState<number>(1);

  const onClose = useCallback(() => {
    setIsOpen(false);
    setSelectedCourt(null);
  }, []);

  const searchAddrFromCoords = (latitude: number, longitude: number) => {
    const geocoder = new kakao.maps.services.Geocoder();

    const callback = (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        // 도로명 주소
        if (result[0].road_address) {
          setSelectedCourt((prev: any) => ({
            ...prev,
            address: result[0].road_address.address_name,
          }));
        }
        // 법정 주소
        else if (result[0].address.address_name) {
          setSelectedCourt((prev: any) => ({
            ...prev,
            address: result[0].address.address_name,
          }));
        }
        // 주소가 없는 경우
        else {
          setSelectedCourt((prev: any) => ({
            ...prev,
            address: "주소가 존재하지 않습니다.",
          }));
        }
      }
    };

    (geocoder as Geocoder).coord2Address(longitude, latitude, callback);
  };

  const fetchCourtsByBoundsAndDatetime = useCallback(
    async (map: kakao.maps.Map) => {
      const bounds = map.getBounds();
      const swLatlng = bounds.getSouthWest();
      const neLatLng = bounds.getNorthEast();

      const startLatitude = swLatlng.getLat();
      const startLongitude = swLatlng.getLng();

      const endLatitude = neLatLng.getLat();
      const endLongitude = neLatLng.getLng();

      const {
        data: { courts },
      } = await courtApi.getCourtsByCoordsAndDate({
        date: getTimezoneDateStringFromDate(selectedDate),
        startLatitude,
        startLongitude,
        endLatitude,
        endLongitude,
        time: selectedSlot,
      });

      setCourts(courts);
    },
    [selectedDate, selectedSlot]
  );

  const handleZoomIn = useCallback(() => {
    if (map) {
      setLevel(map.getLevel() - 1);
    }
  }, [map]);

  const handleZoomOut = useCallback(() => {
    if (map) {
      setLevel(map.getLevel() + 1);
    }
  }, [map]);

  const handleChangeSlot = useCallback((e) => {
    setSelectedSlot(e.target.value);
  }, []);

  const handleDateClick = useCallback(
    (selectedDate: Dayjs) => {
      if (currentDate.isSame(selectedDate)) {
        const currentSlot = getSlotFromDate(dayjs());
        const selectedSlotIndex = slotItems.findIndex(
          ({ value }) => value === selectedSlot
        );
        const currentSlotIndex = slotItems.findIndex(
          ({ value }) => value === currentSlot
        );

        if (selectedSlotIndex < currentSlotIndex) {
          setSelectedSlot(currentSlot);
        }
      }

      setSelectedDate(selectedDate);
    },
    [currentDate, selectedSlot]
  );

  const handleMarkerClick = useCallback(
    (court: any) => {
      setIsOpen(true);
      searchAddrFromCoords(court.latitude, court.longitude);
      setSelectedCourt(court);
      router.push(`/courts?courtId=${court.courtId}`, undefined, {
        shallow: true,
      });
    },
    [router]
  );

  const handleChangeSnap = useCallback((snap: number) => {
    setSnap(snap);
  }, []);

  const handleGetCurrentLocation = useCallback(async () => {
    getCurrentLocation(async ([latitude, longitude]) => {
      setCenter([latitude, longitude]);
      setIsInitialized(true);
    });
  }, []);

  useEffect(() => {
    const restoreCourts = async (courtId: APICourt["id"]) => {
      try {
        const { data: court } = await courtApi.getCourtDetail(
          courtId,
          getTimezoneDateStringFromDate(selectedDate),
          selectedSlot
        );

        const { latitude, longitude } = court;

        if (court) {
          setCenter([latitude, longitude]);
          setIsOpen(true);
          searchAddrFromCoords(latitude, longitude);
          setSelectedCourt({ ...court, courtId });
          setIsInitialized(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (router.isReady) {
      const { courtId } = router.query;

      if (courtId) {
        restoreCourts(`${courtId}`);
      } else {
        handleGetCurrentLocation();
      }
    }
  }, [map]);

  useEffect(() => {
    const updateSelectedCourtDetail = async () => {
      const { data: court } = await courtApi.getCourtDetail(
        selectedCourt.courtId,
        getTimezoneDateStringFromDate(selectedDate),
        selectedSlot
      );

      setSelectedCourt((prev: any) => ({ ...prev, ...court }));
    };

    if (map) {
      fetchCourtsByBoundsAndDatetime(map);

      if (selectedCourt) {
        updateSelectedCourtDetail();
      }
    }
  }, [
    map,
    fetchCourtsByBoundsAndDatetime,
    center,
    authProps.currentUser.favorites,
  ]);

  return (
    <>
      <Head>
        <title>탐색 | Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      <DatePicker
        startDate={currentDate}
        selectedDate={selectedDate}
        onClick={handleDateClick}
      />

      <Map.KakaoMap
        level={level}
        center={center}
        onClick={onClose}
        onDragStart={onClose}
        onDragEnd={fetchCourtsByBoundsAndDatetime}
        onZoomChanged={(map: kakao.maps.Map) => {
          fetchCourtsByBoundsAndDatetime(map);
          onClose();
        }}
      >
        <Map.ZoomButton onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        <Map.CurrentLocationButton
          onGetCurrentLocation={handleGetCurrentLocation}
        />
        <TopFixedSlotPicker
          currentDateTimeSlot={
            currentDate.isSame(selectedDate) ? getSlotFromDate(dayjs()) : null
          }
          selectedSlot={selectedSlot}
          onChange={handleChangeSlot}
        />
        {!isInitialized && <BasketballLoading />}

        {map &&
          courts &&
          courts.map((court: any) => (
            <BasketballMarker
              key={court.courtId}
              map={map}
              court={court}
              onClick={handleMarkerClick}
            />
          ))}
      </Map.KakaoMap>

      <ModalSheet isOpen={isOpen} onClose={onClose} onSnap={handleChangeSnap}>
        {selectedCourt && (
          <ModalContentContainer>
            <Spacer gap="xs" type="vertical">
              <CourtItem.Header>{selectedCourt.courtName}</CourtItem.Header>
              <CourtItem.Address>{selectedCourt.address}</CourtItem.Address>
            </Spacer>
            <ReservationCount block strong size="lg">
              {selectedCourt.courtReservation} 명
            </ReservationCount>
            <Actions gap="xs">
              <CourtItem.FavoritesToggle courtId={selectedCourt.courtId} />
              <CourtItem.Share
                court={{
                  id: selectedCourt.courtId,
                  latitude: selectedCourt.latitude,
                  longitude: selectedCourt.longitude,
                  name: selectedCourt.courtName,
                }}
              />
              <CourtItem.ChatLink
                chatroomId={
                  // TODO: Court에 chatroomId 포함시키기
                  "1"
                }
              />
              <CourtItem.KakaoMapLink
                latitude={selectedCourt.latitude}
                longitude={selectedCourt.longitude}
                courtName={selectedCourt.courtName}
              />

              {localToken ? (
                <Link
                  href={{
                    pathname: `/courts/[courtId]/[date]`,
                    query: {
                      timeSlot: selectedSlot,
                    },
                  }}
                  as={`/courts/${
                    selectedCourt.courtId
                  }/${getTimezoneDateStringFromDate(selectedDate)}`}
                  passHref
                >
                  <a style={{ flex: 1, display: "flex" }}>
                    <Button size="lg" style={{ flex: 1 }}>
                      예약하기
                    </Button>
                  </a>
                </Link>
              ) : (
                <Link href={"/login"} passHref>
                  <a style={{ flex: 1, display: "flex" }}>
                    <Button size="lg" style={{ flex: 1 }}>
                      로그인하고 예약하기
                    </Button>
                  </a>
                </Link>
              )}
            </Actions>

            {snap === 0 ? (
              <>
                <div>농구장 사진</div>
                <div
                  style={{
                    width: "100%",
                    height: 200,
                    backgroundColor: "orange",
                  }}
                >
                  농구장 사진사진
                </div>

                <div>코트 바닥 정보</div>
                <div>고무고무</div>
              </>
            ) : null}
          </ModalContentContainer>
        )}
      </ModalSheet>

      <LeadToLoginModal
        headerContent={
          <p style={{ textAlign: "center" }}>
            로그인하면 새 농구장을 추가할 수 있습니다
          </p>
        }
        isOpen={isOpenLeadToLoginModal}
        cancel={{
          content: "닫기",
          handle: () => {
            setIsOpenLeadToLoginModal(false);
          },
        }}
        confirm={{
          content: "로그인하러 가기",
          handle: () => {
            router.push("/login");
          },
        }}
      />
    </>
  );
};

export default Courts;

const TopFixedSlotPicker = styled(SlotPicker)`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  filter: ${({ theme }) => theme.filter.dropShadow};
`;

const Actions = styled(Spacer)`
  margin-top: ${({ theme }) => theme.gaps.sm};
`;

const ModalContentContainer = styled.div`
  margin: 0 20px;
  margin-top: 10px;
`;

const ReservationCount = styled(Text)`
  color: ${({ theme }) => theme.colors.gray800};
  margin-top: ${({ theme }) => theme.gaps.md};
`;
