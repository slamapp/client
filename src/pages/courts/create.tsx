import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Sheet from "react-modal-sheet";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import type { APICourt, APINewCourt, Coord } from "~/domainTypes/tobe";
import { withRouteGuard } from "~/hocs";
import { courtApi } from "~/service";
import { useForm } from "~/hooks";
import { useMapContext, useNavigationContext } from "~/contexts/hooks";
import { getCurrentLocation } from "~/utils/geolocation";
import {
  Map,
  GeneralMarker,
  BottomFixedButton,
  LeadToLoginModal,
  BasketballLoading,
} from "~/components/domain";
import { Input, Text, Button, Label, Icon, Spacer } from "~/components/base";

interface Geocoder extends kakao.maps.services.Geocoder {
  coord2Address: (
    latitude: APICourt["latitude"],
    longitude: APICourt["longitude"],
    callback?: (result: any, status: kakao.maps.services.Status) => void
  ) => string;
}

const CreateCourt: NextPage = () => {
  const { map } = useMapContext();

  const router = useRouter();

  const { useMountPage } = useNavigationContext();
  useMountPage("PAGE_COURT_CREATE");

  const [isOpen, setOpen] = useState(false);
  const [level, setLevel] = useState(3);
  const [center, setCenter] = useState<Coord>();
  const [position, setPosition] = useState<Coord>();
  const [address, setAddress] = useState<string>();
  const [validatedBasketCount, setValidatedBasketCount] = useState(1);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const searchAddrFromCoords = ([latitude, longitude]: Coord) => {
    const geocoder = new kakao.maps.services.Geocoder();

    (geocoder as Geocoder).coord2Address(
      longitude,
      latitude,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          // 도로명 주소
          if (result[0].road_address) {
            setAddress(result[0].road_address.address_name);
          }
          // 법정 주소
          else if (result[0].address.address_name) {
            setAddress(result[0].address.address_name);
          }
          // 주소가 없는 경우
          else {
            setAddress("주소가 존재하지 않습니다.");
          }
        }
      }
    );
  };

  const handleClickKakaoMap = (
    _: kakao.maps.Map,
    { latLng }: kakao.maps.event.MouseEvent
  ) => {
    if (latLng) {
      setPosition([latLng.getLat(), latLng.getLng()]);
      searchAddrFromCoords([latLng.getLat(), latLng.getLng()]);
    }
  };

  const handleGetCurrentLocation = useCallback(() => {
    getCurrentLocation(([latitude, longitude]) => {
      setCenter([latitude, longitude]);
    });
  }, []);

  const handleZoomIn = useCallback(() => {
    setLevel((level) => level - 1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setLevel((level) => level + 1);
  }, []);

  const handleClickSaveLocationButton = () => {
    setOpen(false);
    if (position) {
      const [latitude, longitude] = position;
      setValues((prev) => ({ ...prev, latitude, longitude }));
      setCenter(position);
    }
  };

  useEffect(() => {
    handleGetCurrentLocation();
  }, [handleGetCurrentLocation]);

  const { values, errors, isLoading, setValues, handleSubmit } = useForm<
    Pick<
      APINewCourt,
      "longitude" | "latitude" | "image" | "texture" | "basketCount" | "name"
    >
  >({
    initialValues: {
      longitude: 0,
      latitude: 0,
      image: null,
      texture: "ETC",
      basketCount: 1,
      name: "",
    },
    onSubmit: async (values) => {
      try {
        await courtApi.createNewCourt(values);
        router.push("/courts");
      } catch (error) {
        console.error(error);
      }
    },
    validate: (values) => {
      const errors: { [key in keyof typeof values]?: string } = {};
      const { basketCount, name, longitude, latitude } = values;

      if (!name) {
        errors.name = "농구장 이름을 입력해주세요.";
      }
      if (basketCount < 1) {
        errors.basketCount = "골대 개수를 입력해주세요.";
      }
      if (!longitude || !latitude) {
        errors.longitude = "위치를 지정해주세요.";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (values.basketCount > 99) {
      setValidatedBasketCount(
        Number(values.basketCount.toString().slice(0, 2))
      );
    } else {
      setValidatedBasketCount(values.basketCount);
    }
  }, [values.basketCount]);

  return (
    <div>
      <Head>
        <title>새 농구장 추가</title>
      </Head>

      <CustomSheet
        isOpen={isOpen}
        disableDrag={true}
        onClose={() => setOpen(false)}
      >
        <Sheet.Container onViewportBoxUpdate={() => {}}>
          <Sheet.Header onViewportBoxUpdate={() => {}} />
          <Sheet.Content
            onViewportBoxUpdate={() => {}}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <MapGuide size="md" strong>
              <DecoIcon name="map-pin" color="#FE6D04" />
              {address ?? `지도에서 위치를 선택해주세요`}
            </MapGuide>
            {!center && <BasketballLoading />}
            {center && isOpen ? (
              <Map.KakaoMap
                level={level}
                center={center!}
                draggable={true}
                zoomable={true}
                onClick={handleClickKakaoMap}
              >
                <Map.ZoomButton
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  bottom={120}
                />
                <Map.CurrentLocationButton
                  onGetCurrentLocation={handleGetCurrentLocation}
                  bottom={120}
                />
                {position ? (
                  <GeneralMarker map={map!} position={position} />
                ) : null}
              </Map.KakaoMap>
            ) : null}
            <BottomFixedButton
              type="button"
              disabled={!center}
              onClick={handleClickSaveLocationButton}
              containerStyle={{ zIndex: 10000000 }}
            >
              농구장 위치 저장하기
            </BottomFixedButton>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onViewportBoxUpdate={() => {}} />
      </CustomSheet>

      <form>
        <MainContainer>
          <Spacer gap="base" type="vertical">
            <div>
              <Input
                label="농구장 이름"
                type="text"
                name="name"
                onChange={({ target }) =>
                  setValues((prev) => ({
                    ...prev,
                    [target.name]: target.value,
                  }))
                }
                value={values.name}
                placeholder="ex) 슬램대학교 상경대 앞 농구장"
                isRequired
                visibleError={!!errors.name}
              />
              <ErrorMessage size="sm" block>
                {errors.name}
              </ErrorMessage>
            </div>
            <div>
              <Label isRequired>위치</Label>
              <PreviewContainer>
                {values.latitude && values.longitude && !isOpen ? (
                  <div>
                    <AddressGuide>
                      <DecoIcon name="map-pin" color="#FE6D04" size="sm" />
                      {address}
                    </AddressGuide>
                    <div style={{ position: "relative" }}>
                      <Map.KakaoMap
                        level={level}
                        center={[values.latitude, values.longitude]}
                        draggable={false}
                        zoomable={false}
                        style={{
                          width: "100%",
                          height: "150px",
                        }}
                      >
                        <GeneralMarker
                          map={map!}
                          position={[values.latitude, values.longitude]}
                        />
                      </Map.KakaoMap>
                      <MoveToMap onClick={() => setOpen(true)} />
                    </div>
                  </div>
                ) : (
                  <PreviewBanner className={errors.longitude ? "error" : ""}>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => setOpen(true)}
                      style={{ zIndex: 1 }}
                    >
                      지도에서 위치 찾기
                    </Button>
                  </PreviewBanner>
                )}
              </PreviewContainer>
              <ErrorMessage size="sm" block>
                {errors.longitude}
              </ErrorMessage>
            </div>
            <div>
              <Input
                label="골대 개수"
                type="number"
                name="basketCount"
                onChange={({ target }) =>
                  setValues((prev) => ({
                    ...prev,
                    [target.name]: target.value,
                  }))
                }
                isRequired
                value={validatedBasketCount}
                visibleError={!!errors.basketCount}
              />
              <ErrorMessage size="sm" block>
                {errors.basketCount}
              </ErrorMessage>
            </div>
          </Spacer>
        </MainContainer>
        <BottomFixedButton
          type="submit"
          onClick={() => setIsOpenConfirmModal(true)}
          disabled={!!Object.keys(errors).length}
        >
          {isLoading ? "Loading..." : "새 농구장 추가 제안하기"}
        </BottomFixedButton>
      </form>

      <LeadToLoginModal
        headerContent={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            <Spacer gap={4} type="vertical">
              <Text size="md" strong block>
                새 농구장 추가를 제안하시겠습니까?
              </Text>
              <SubText size="xs" block>
                제출한 코트 정보는 관리자의 승인을 거쳐 반영됩니다.
              </SubText>
            </Spacer>
          </div>
        }
        isOpen={isOpenConfirmModal}
        cancel={{
          content: "닫기",
          handle: () => {
            setIsOpenConfirmModal(false);
          },
        }}
        confirm={{
          content: "제출하기",
          handle: (e) => {
            try {
              handleSubmit(e);
              router.push("/courts");
            } catch (error) {
              console.error(error);
            }
          },
        }}
      />
    </div>
  );
};

export default withRouteGuard("private", CreateCourt);

const MainContainer = styled.div`
  padding: ${({ theme }) => `30px ${theme.gaps.base}`};
`;

const PreviewContainer = styled.div`
  width: 100%;
`;

const PreviewBanner = styled.div`
  width: 100%;
  height: 150px;
  background-image: url("/assets/preview_map.png");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: inset 0 0 20px 2px rgba(0, 0, 0, 0.2);
  }

  &.error::before {
    border: 1px solid ${({ theme }) => theme.colors.red.strong};
  }
`;

const CustomSheet = styled(Sheet)`
  max-width: 640px;
  margin: auto;
`;

const MapGuide = styled(Text)`
  margin: ${({ theme }) => theme.gaps.md};
  margin-top: 0;
`;

const DecoIcon = styled(Icon)`
  vertical-align: text-bottom;
  margin-right: ${({ theme }) => theme.gaps.xxs};
`;

const AddressGuide = styled.p`
  margin: 12px 0;
`;

const MoveToMap = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  cursor: pointer;
`;

const SubText = styled(Text)`
  color: ${({ theme }) => theme.colors.gray500};
`;

const ErrorMessage = styled(Text)`
  text-align: right;
  flex-grow: 1;
  margin: 4px 0;
  color: ${({ theme }) => theme.colors.red.strong};
`;
