import type { ReactNode } from "react";
import styled from "@emotion/styled";
import Sheet from "react-modal-sheet";

interface Props {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  onSnap?: (snap: number) => void;
  onCloseStart?: () => void;
}

const CustomSheet = styled(Sheet)`
  z-index: 1000 !important;
  .react-modal-sheet-container {
    max-width: 640px;
    right: 0;
    margin: auto;
  }
`;

const ModalSheet: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  onSnap,
  onCloseStart,
}) => {
  return (
    <CustomSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[600 + 56, 270 + 56]}
      initialSnap={1}
      onSnap={onSnap}
      onCloseStart={onCloseStart}
    >
      <Sheet.Container onViewportBoxUpdate={() => {}}>
        <Sheet.Header onViewportBoxUpdate={() => {}} />
        <Sheet.Content onViewportBoxUpdate={() => {}}>{children}</Sheet.Content>
      </Sheet.Container>
    </CustomSheet>
  );
};

export default ModalSheet;
