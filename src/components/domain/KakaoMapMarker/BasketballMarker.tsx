import { useCallback, useEffect, useMemo } from "react";
import { useAuthContext } from "~/contexts/hooks";

interface Props {
  map: kakao.maps.Map;
  court: any; // 추후 API 명세 나오면 수정 예정
  onClick: (court: any) => void;
}

const PAUSE_COURT_NUMBER = 0;
const FIRE_COURT_NUMBER = 6;

const BasketballMarker = ({ map, court, onClick }: Props): JSX.Element => {
  const { authProps } = useAuthContext();
  const { favorites, reservations } = authProps.currentUser;

  const marker = useMemo(
    () =>
      new kakao.maps.Marker({
        position: new kakao.maps.LatLng(0, 0),
        clickable: true,
        title: court.courtName,
      }),
    []
  );

  const handleClick = useCallback(() => {
    onClick(court);
  }, [court, onClick]);

  useEffect(() => {
    if (map) {
      let imageSrc = "/assets/basketball/animation_off_400.png";

      const isReservatedCourt = reservations.some(
        ({ courtId }) => courtId === court.courtId
      );
      const isFavoritedCourt = favorites.some(
        ({ courtId }) => courtId === court.courtId
      );

      if (isFavoritedCourt) {
        imageSrc = "/assets/basketball/animation_off_favorited.png";
      }

      if (
        court.courtReservation > PAUSE_COURT_NUMBER &&
        court.courtReservation < FIRE_COURT_NUMBER
      ) {
        if (isReservatedCourt && isFavoritedCourt) {
          imageSrc = "/assets/basketball/fire_off_all_tagged.gif";
        } else if (isReservatedCourt) {
          imageSrc = "/assets/basketball/fire_off_reservated.gif";
        } else if (isFavoritedCourt) {
          imageSrc = "/assets/basketball/fire_off_favorited.gif";
        } else {
          imageSrc = "/assets/basketball/fire_off_400.gif";
        }
      }

      if (court.courtReservation >= FIRE_COURT_NUMBER) {
        if (isReservatedCourt && isFavoritedCourt) {
          imageSrc = "/assets/basketball/fire_on_all_tagged.gif";
        } else if (isReservatedCourt) {
          imageSrc = "/assets/basketball/fire_on_reservated.gif";
        } else if (isFavoritedCourt) {
          imageSrc = "/assets/basketball/fire_on_favorited.gif";
        } else {
          imageSrc = "/assets/basketball/fire_on_400.gif";
        }
      }

      const imageSize = new kakao.maps.Size(80, 150);

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, {
        offset: new kakao.maps.Point(35, 35),
        spriteOrigin: new kakao.maps.Point(5, 90),
        shape: "circle",
      });

      const markerPosition = new kakao.maps.LatLng(
        court.latitude,
        court.longitude
      );

      marker.setImage(markerImage);
      marker.setPosition(markerPosition);
      marker.setMap(map);

      // TODO: remove Event Listner를 위한 wrapping 또는 정보 저장 필요
      kakao.maps.event.addListener(marker, "click", handleClick);
    }

    return () => {
      kakao.maps.event.removeListener(marker, "click", handleClick);
      marker.setMap(null);
    };
  }, [map, court, handleClick, marker]);

  // TODO: 일단 반환 해놓은 더미 없애기
  return <div></div>;
};

export default BasketballMarker;
