import type { ReactNode } from "react";
import { Button } from "~/components/base";
import Modal from "../Modal";

interface Props {
  headerContent: ReactNode;
  isOpen: boolean;
  cancel: { content: ReactNode; handle: (e?: any) => void };
  confirm: { content: ReactNode; handle: (e?: any) => void };
}

const LeadToLoginModal = ({
  headerContent,
  isOpen,
  cancel,
  confirm,
}: Props) => (
  <Modal visible={isOpen} onClose={cancel.handle}>
    <Modal.Header>{headerContent}</Modal.Header>
    <Modal.BottomButtonContainer>
      <Button style={{ flex: 1 }} secondary size="lg" onClick={cancel.handle}>
        {cancel.content}
      </Button>
      <Button style={{ flex: 1 }} size="lg" onClick={confirm.handle}>
        {confirm.content}
      </Button>
    </Modal.BottomButtonContainer>
  </Modal>
);

export default LeadToLoginModal;
