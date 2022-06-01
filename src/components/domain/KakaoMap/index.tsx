import React, { useEffect, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";
import styled from "@emotion/styled";
import { useMapContext } from "~/contexts/hooks";
import type { Coord } from "~/domainTypes/tobe";
import { DEFAULT_POSITION } from "~/utils/geolocation";
import useKakaoMapEvent from "./useKakaoMapEvent";
import ZoomButton from "./ZoomButton";
import CurrentLocationButton from "./CurrentLocationButton";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  level: number;
  center: Coord;
  draggable?: boolean;
  zoomable?: boolean;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: (_: kakao.maps.Map, event: kakao.maps.event.MouseEvent) => void;
  onDragEnd?: any;
  onDragStart?: any;
  onZoomChanged?: any;
}

const KakaoMap = ({
  level,
  center,
  draggable = true,
  zoomable = true,
  onClick,
  onDragEnd,
  onDragStart,
  onZoomChanged,
  children,
  style,
}: Props): JSX.Element => {
  const { map, handleInitMap } = useMapContext();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(center[0], center[1]));
    }
  }, [map, center]);

  useEffect(() => {
    if (map) {
      map.setLevel(level);
    }
  }, [map, level]);

  useEffect(() => {
    if (map) {
      map.setDraggable(draggable);
    }
  }, [map, draggable]);

  useEffect(() => {
    if (map) {
      map.setZoomable(zoomable);
    }
  }, [map, zoomable]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(...DEFAULT_POSITION),
        level: 3,
      };
      const newMap = new window.kakao.maps.Map(mapRef.current, options);

      handleInitMap(newMap);
    });
  }, [handleInitMap]);

  useKakaoMapEvent<kakao.maps.Map>(map, "click", onClick);
  useKakaoMapEvent<kakao.maps.Map>(map, "dragstart", onDragStart);
  useKakaoMapEvent<kakao.maps.Map>(map, "dragend", onDragEnd);
  useKakaoMapEvent<kakao.maps.Map>(map, "zoom_changed", onZoomChanged);

  return (
    <>
      <MapContainer ref={mapRef} style={style}>
        {children}
      </MapContainer>
    </>
  );
};

KakaoMap.ZoomButton = ZoomButton;
KakaoMap.CurrentLocationButton = CurrentLocationButton;

const Map = {
  KakaoMap,
  ZoomButton,
  CurrentLocationButton,
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
`;
