import type { MouseEvent } from "react";
import * as S from "./style";

interface Props {
  bottom?: number;
  onGetCurrentLocation: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const CurrentLocationButton: React.FC<Props> = ({
  onGetCurrentLocation,
  bottom,
}) => (
  <S.PositionAction bottom={bottom}>
    <S.MapIconButton
      name="crosshair"
      type="button"
      iconColor="#6B94E5"
      onClick={onGetCurrentLocation}
    />
  </S.PositionAction>
);

export default CurrentLocationButton;
