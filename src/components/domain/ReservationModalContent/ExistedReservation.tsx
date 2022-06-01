import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { Button, Text } from "~/components/base";
import { useReservationContext } from "~/contexts/hooks";
import { BottomFixedContainer } from "../BottomFixedButton";
import Modal from "../Modal";
import ParticipantsPerTime from "./ParticipantsPerTime";
import SelectedTime from "./SelectedTime";
import * as S from "./style";

interface Props {
  timeSlot: string;
  participantsPerBlock: any[];
  reservationId: number;
  requestDisabled: boolean;
}

const ExistedReservationContent = ({
  timeSlot,
  participantsPerBlock,
  reservationId,
  requestDisabled,
}: Props) => {
  const { handleDeleteReservation, handleStartUpdate } =
    useReservationContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <S.ModalContent>
        <SelectedTime timeSlot={timeSlot} />
        <ParticipantsPerTime participantsPerBlock={participantsPerBlock} />
      </S.ModalContent>

      <BottomFixedBackground>
        {!requestDisabled ? (
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              position: "relative",
              width: "100%",
              gap: "10px",
            }}
          >
            <Button type="button" size="lg" onClick={handleOpenModal} secondary>
              예약 취소하기
            </Button>
            <Button type="button" size="lg" onClick={handleStartUpdate}>
              예약 수정하기
            </Button>
          </div>
        ) : (
          <Text block style={{ margin: "0 auto" }}>
            예약을 수정 또는 취소할 수 없습니다.
          </Text>
        )}
      </BottomFixedBackground>

      <Modal visible={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>예약을 취소하시겠습니까?</Modal.Header>
        <Modal.BottomButtonContainer>
          <Button
            style={{ flex: 1 }}
            secondary
            size="lg"
            onClick={handleCloseModal}
          >
            아니오
          </Button>
          <Button
            style={{ flex: 1 }}
            size="lg"
            onClick={() => handleDeleteReservation(reservationId)}
          >
            네
          </Button>
        </Modal.BottomButtonContainer>
      </Modal>
    </>
  );
};

export default ExistedReservationContent;

const BottomFixedBackground = styled(BottomFixedContainer)`
  display: flex;
  button:first-of-type {
    border: 2px solid black;
  }
`;
