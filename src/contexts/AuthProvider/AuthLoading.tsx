import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useAuthContext } from "~/contexts/hooks";
import { Logo } from "~/components/domain";

const FADE_OUT_TIME_MS = 400;

const AuthLoading = () => {
  const { authProps } = useAuthContext();
  const { isLoading } = authProps;

  const [isDisplay, setIsDisplay] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setIsDisplay(true);
    } else {
      setTimeout(() => setIsDisplay(false), FADE_OUT_TIME_MS);
    }
  }, [isLoading]);

  return isDisplay ? (
    <LoadingContainer isShow={isLoading}>
      <Logo width={100} />
    </LoadingContainer>
  ) : (
    <></>
  );
};

const LoadingContainer = styled.div<{ isShow: boolean }>`
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 4000;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);

  // 애니메이션
  transition: all ${FADE_OUT_TIME_MS}ms ease-out;
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
`;

export default AuthLoading;
