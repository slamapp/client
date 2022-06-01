import React, { useCallback, useState } from "react";

import { Spacer, Text } from "~/components/base";
import { useReservationContext } from "~/contexts/hooks";
import * as S from "./style";
import BottomFixedButton from "../BottomFixedButton";
import HasBallDecisionModal from "./HasBallDecisionModal";
import ParticipantsPerTime from "./ParticipantsPerTime";
import TimeForm from "./TimeForm";

interface Props {
  startTime: string;
  endTime: string | null;
  currentInput: "START" | "END";
  hasBall: boolean;
  buttonText: string;
  requestDisabled: boolean;
  participantsPerBlock: any[];
  onSubmit: (hasBall: boolean) => void;
}

const SelectedRangeContent = ({
  startTime,
  endTime,
  currentInput,
  buttonText,
  participantsPerBlock,
  requestDisabled,
  onSubmit,
}: Props) => {
  const { handleChangeHasBall, handleSetCurrentInput } =
    useReservationContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDecideHasBall = useCallback(
    (hasBall: boolean) => {
      setIsModalOpen(false);
      handleChangeHasBall(hasBall);
      onSubmit(hasBall);
    },
    [handleChangeHasBall, onSubmit]
  );

  return (
    <>
      <S.ModalContent>
        <Spacer gap="xs" type="vertical">
          <Text>선택한 시간</Text>
          <TimeForm
            onSetCurrentInput={handleSetCurrentInput}
            currentInput={currentInput}
            startTime={startTime}
            endTime={endTime}
          />
        </Spacer>
        <ParticipantsPerTime participantsPerBlock={participantsPerBlock} />
      </S.ModalContent>
      <div
        style={{
          padding: "0 20px",
        }}
      >
        <BottomFixedButton
          type="button"
          disabled={requestDisabled || !endTime}
          onClick={handleModalOpen}
        >
          {!requestDisabled
            ? endTime
              ? `${startTime}-${endTime} ${buttonText}`
              : "종료 시간을 선택해주세요"
            : "이미 예약한 시간이 포함되어 있습니다"}
        </BottomFixedButton>
      </div>

      <HasBallDecisionModal
        visible={isModalOpen}
        onClose={handleModalClose}
        onDecideBall={handleDecideHasBall}
      />
    </>
  );
};

export default SelectedRangeContent;
