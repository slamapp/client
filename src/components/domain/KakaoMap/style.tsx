import styled from "@emotion/styled";
import { IconButton } from "~/components/base";

const PositionAction = styled.div<{ bottom?: number }>`
  position: absolute;
  bottom: ${({ bottom }) => (bottom ? `${bottom + 110}px` : "110px")};
  right: 12px;
  z-index: 10;
`;

const MapIconButton = styled(IconButton)`
  padding: ${({ theme }) => theme.gaps.xs};
  border: none;
  border-radius: 0;
`;

const ZoomActions = styled.div<{ bottom?: number }>`
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  right: 12px;
  bottom: ${({ bottom }) => (bottom ? `${bottom + 230}px` : "230px")};
  z-index: 10;

  button:first-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  }
`;

export { PositionAction, MapIconButton, ZoomActions };
