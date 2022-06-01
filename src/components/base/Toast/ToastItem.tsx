import { useState } from "react";
import styled from "@emotion/styled";
import Text from "~/components/base/Text";
import useTimeout from "~/hooks/useTimeout";

interface Props {
  message: string;
  duration: number;
  onDone?: () => void;
  isProgressBar?: boolean;
}

const ToastItem = ({
  message,
  duration,
  onDone,
  isProgressBar = false,
}: Props) => {
  const [show, setShow] = useState(true);

  useTimeout(() => {
    setShow(false);
    if (onDone) {
      setTimeout(() => onDone(), 400);
    }
  }, duration);

  return (
    <Container style={{ opacity: show ? 1 : 0 }}>
      {isProgressBar && (
        <ProgressBar style={{ animationDuration: `${duration}ms` }} />
      )}
      <Text>{message}</Text>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  min-height: 70px;
  padding: 0 20px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme?.colors?.gray800 || "#292929"};
  font-weight: 700;

  // Glassmorphism
  background: rgba(255, 255, 255, 0.4);
  text-shadow: 0 0px 48px rgba(255, 255, 255, 1),
    0 0px 24px rgba(255, 255, 255, 1);
  box-shadow: inset 0 0 42px rgba(255, 255, 255, 0.6),
    0 8px 32px 0 rgba(0, 0, 0, 0.37);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  overflow: hidden;

  // 애니메이션
  opacity: 1;
  transition: opacity 0.4s ease-out;
  &:first-of-type {
    animation: move 0.4s ease-out forwards;
  }
  &:not(:first-of-type) {
    margin-top: 8px;
  }
  @keyframes move {
    0% {
      margin-top: 80px;
    }
    100% {
      margin-top: 0;
    }
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 4px;
  background-color: #2e2e2e;
  animation-name: progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;

export default ToastItem;
