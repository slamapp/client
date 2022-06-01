import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { useLocalToken } from "~/hooks/domain";
import type { ContextProps } from "./context";
import { Context } from "./context";
import useStomp from "./useStomp";

interface Props {
  children: ReactNode;
}

const SocketProvider = ({ children }: Props) => {
  const [token] = useLocalToken();
  const { isConnected, isLoading, sendAuth } = useStomp(token);

  const sendFollow: ContextProps["sendFollow"] = (body) => {
    sendAuth(`/follow`, body);
  };

  const sendFollowCancel: ContextProps["sendFollowCancel"] = (body) => {
    sendAuth(`/followcancel`, body);
  };

  const sendLoudSpeaker: ContextProps["sendLoudSpeaker"] = (body) => {
    sendAuth(`/loudSpeaker`, body);
  };

  return (
    <Context.Provider
      value={{
        sendFollow,
        sendFollowCancel,
        sendLoudSpeaker,
      }}
    >
      {isLoading ? (
        <StyledTopSocketLoading isLoading={true} />
      ) : isConnected ? (
        <></>
      ) : (
        <StyledTopSocketLoading isLoading={false} />
      )}

      {children}
    </Context.Provider>
  );
};

export default SocketProvider;

const StyledTopSocketLoading = styled.div<{ isLoading: boolean }>`
  position: absolute;
  height: 4px;
  width: 100%;
  background: linear-gradient(
    90deg,
    ${({ isLoading }) =>
      isLoading
        ? `#EDEBE7, #EDEBE7, #FAF9F7, #EDEBE7,#EDEBE7, #FAF9F7, #EDEBE7, #EDEBE7`
        : "#EDEBE7, #EDEBE7"}
  );
  background-size: 200% 100%;
  animation: ${({ isLoading }) =>
    isLoading ? "gradient-animation 2s linear infinite" : "none"};
  z-index: 2500;

  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }
`;
