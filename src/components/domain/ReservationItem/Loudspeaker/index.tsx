import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "~/components/base";
import { useSocketContext } from "~/contexts/hooks";

const ONE_HOUR_SECONDS = 3600;

// 확성기가 켜지기까지 남은 시간?
const getRestTimeBeforeActivate = (startTime: any) => {
  const timeDiff = new Date(startTime).getTime() - new Date().getTime();

  return timeDiff - ONE_HOUR_SECONDS * 1000;
};

interface Props {
  startTime: string;
  courtId: number;
  reservationId: number;
}

const Loudspeaker = ({ startTime, courtId, reservationId }: Props) => {
  const { sendLoudSpeaker } = useSocketContext();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (new Date(startTime).getTime() < new Date().getTime()) {
      setIsActive(false);
    } else {
      const restTIme = getRestTimeBeforeActivate(startTime);

      const timerId = setTimeout(() => {
        setIsActive(true);
      }, restTIme);

      return () => {
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    }
  }, []);

  return (
    <div
      onClick={() => {
        sendLoudSpeaker({ courtId, startTime, reservationId });
      }}
    >
      {isActive ? <StyledButton>🔈</StyledButton> : null}
    </div>
  );
};

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.buttonHeights.lg};
  height: ${({ theme }) => theme.buttonHeights.lg};
  background: ${({ theme }) => theme.colors.activeGradientColor};
`;

export default Loudspeaker;
