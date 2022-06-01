import type { ReactNode } from "react";
import { Modal } from "~/components/base";
import * as S from "./style";

interface Props {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
}

const DefaultModal = ({ children, visible, onClose }: Props) => {
  return (
    <Modal
      maxWidth="90vw"
      backgroundColor="white"
      visible={visible}
      onClose={onClose}
    >
      {children}
    </Modal>
  );
};

DefaultModal.Header = S.Header;
DefaultModal.BottomButtonContainer = S.BottomButtonContainer;

export default DefaultModal;
