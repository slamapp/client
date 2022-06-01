import type { Coord } from "~/domainTypes/tobe";

// 서울의 경도, 위도
export const DEFAULT_POSITION: Coord = [37.5665, 126.978];

export const getCurrentLocation = (callback: (coord: Coord) => void) => {
  const options = {
    // 아래 옵션을 켤 경우 느려짐
    // enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const successCallback: PositionCallback = (position) => {
    const { latitude, longitude } = position.coords;
    callback([latitude, longitude]);
  };

  const failCallback: PositionErrorCallback = (error) => {
    console.warn(`에러 ${error.code}: ${error.message}`);
    callback(DEFAULT_POSITION);
  };

  if (navigator) {
    navigator.geolocation.getCurrentPosition(
      successCallback,
      failCallback,
      options
    );
  }
};
