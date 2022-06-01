import type { ReactNode } from "react";
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { BottomNavigation, TopNavigation } from "~/components/domain";
import { useNavigationContext } from "~/contexts/hooks";
import Container from "./Container";

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { navigationProps } = useNavigationContext();
  const { isBottomNavigation, isTopNavigation } = navigationProps;

  return (
    <Container ref={containerRef}>
      {isTopNavigation && <TopNavigation />}
      <StyledMain>{children}</StyledMain>
      <ToastPortal
        id="toast-portal"
        isBottomNavigation={isBottomNavigation}
        containerRect={containerRef?.current?.getClientRects()[0]}
      />
      {isBottomNavigation && <BottomNavigation />}
    </Container>
  );
};

export default DefaultLayout;

const ToastPortal = styled.div<{
  isBottomNavigation?: boolean;
  containerRect?: DOMRect;
}>`
  ${({ isBottomNavigation, containerRect }) => css`
    position: fixed;
    left: ${(containerRect?.left || 0) + 16}px;
    width: ${(containerRect?.width || 0) - 32}px;
    bottom: ${isBottomNavigation ? 72 : 16}px;
  `}
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
