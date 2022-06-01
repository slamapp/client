import { useMemo, useEffect } from "react";
import type { Coord } from "~/domainTypes/tobe";

interface Props {
  map: kakao.maps.Map;
  position: Coord;
}

const GeneralMarker = ({ map, position }: Props): JSX.Element => {
  const marker = useMemo(
    () =>
      new kakao.maps.Marker({
        position: new kakao.maps.LatLng(0, 0),
        clickable: true,
      }),
    []
  );

  useEffect(() => {
    if (map) {
      const markerPosition = new kakao.maps.LatLng(position[0], position[1]);

      marker.setPosition(markerPosition);

      marker.setMap(map);

      // TODO: remove Event Listner를 위한 wrapping 또는 정보 저장 필요
    }

    return () => {
      marker.setMap(null);
    };
  }, [map, position, marker]);

  // TODO: 일단 반환 해놓은 더미 없애기
  return <div></div>;
};

export default GeneralMarker;
