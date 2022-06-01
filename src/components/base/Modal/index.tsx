import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import ReactDom from "react-dom";
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphicLayoutEffect";
import useClickAway from "../../../hooks/useClickAway";

interface Props {
  children?: ReactNode;
  width?: number;
  height?: number;
  visible?: boolean;
  onClose?: () => void;
  [x: string]: any;
}

const Modal = ({
  children,
  width = 500,
  maxWidth,
  height,
  visible = false,
  onClose = () => {},
  ...props
}: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const ref = useClickAway<HTMLDivElement>(() => {
    onClose();
  });

  const containerStyle = useMemo(
    () => ({ width, maxWidth, height }),
    [width, maxWidth, height]
  );

  const el = useMemo(() => {
    if (typeof document !== "undefined") {
      return document.createElement("div");
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (el) {
      document.body.appendChild(el);
    }

    return () => {
      if (el) {
        document.body.removeChild(el);
      }
    };
  });

  return mounted
    ? ReactDom.createPortal(
        <BackgroundDim style={{ display: visible ? "block" : "none" }}>
          <ModalContainer
            ref={ref}
            {...props}
            style={{ ...props.style, ...containerStyle }}
          >
            {children}
          </ModalContainer>
        </BackgroundDim>,
        el!
      )
    : null;
};

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadiuses.lg};
`;

export default Modal;
