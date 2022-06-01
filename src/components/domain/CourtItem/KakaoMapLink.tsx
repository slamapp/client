import React from "react";
import { IconButton } from "~/components/base";

type KakaoMapButtonType = "information" | "findRoad";
interface Props {
  latitude: number;
  longitude: number;
  courtName: string;
  type?: KakaoMapButtonType;
}

const KakaoMapButton = ({
  latitude,
  longitude,
  courtName,
  type = "information",
}: Props) => {
  const getHref = (type: KakaoMapButtonType) =>
    type === "information"
      ? `https://map.kakao.com/link/map/${courtName},${latitude},${longitude}`
      : `https://map.kakao.com/link/to/${courtName},${latitude},${longitude}`;

  return (
    <a href={getHref(type)} target="_blank" rel="noreferrer">
      <IconButton name="map" />
    </a>
  );
};

export default KakaoMapButton;
