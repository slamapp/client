import React from "react";
import type { ReactNode, CSSProperties } from "react";
import styled from "@emotion/styled";
import ReactDOM from "react-dom";
import { css } from "@emotion/react";
import Link from "next/link";
import { Button, IconButton } from "~/components/base";
import type { FeatherIconNameType } from "~/components/base/Icon";

interface Props {
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick: (e: any) => void;
  className?: string;
  style?: CSSProperties;
  bottom?: number;
  iconButton?: {
    icon: FeatherIconNameType;
    href?: string;
    onClick?: () => void;
  };
  custom?: boolean;
  containerStyle?: CSSProperties;
}

const BottomFixedButton: React.FC<Props> = ({
  children,
  type,
  disabled,
  onClick,
  style,
  className,
  bottom,
  iconButton,
  custom = false,
  containerStyle,
}) => {
  return typeof document !== "undefined" ? (
    ReactDOM.createPortal(
      <Background bottom={bottom} custom={custom} style={containerStyle}>
        {iconButton && iconButton.href ? (
          <Link href={iconButton.href} passHref>
            <a>
              <IconButton name={iconButton.icon} />
            </a>
          </Link>
        ) : (
          iconButton && <IconButton name={iconButton.icon} />
        )}
        <Button
          type={type}
          disabled={disabled}
          onClick={onClick}
          size="lg"
          className={className}
          style={style}
        >
          {children}
        </Button>
      </Background>,
      document.querySelector("#scrolled-container")!
    )
  ) : (
    <></>
  );
};

export const BottomFixedContainer: React.FC = ({
  custom,
  children,
  className,
}: any) =>
  typeof document !== "undefined" ? (
    ReactDOM.createPortal(
      <Background custom={custom} className={className}>
        {children}
      </Background>,
      document.querySelector("#scrolled-container")!
    )
  ) : (
    <></>
  );

const Background = styled.div<Pick<Props, "bottom"> & { custom?: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  box-sizing: border-box;
  position: fixed;
  bottom: ${({ bottom }) => (bottom ? `${bottom}px` : 0)};
  width: 100%;
  height: 120px;
  z-index: 2000;
  background: ${({ theme }) =>
    `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${theme.colors.white} 55%)`};
  padding: ${({ theme }) => theme.gaps.base};
  max-width: 640px;

  button {
    bottom: ${({ theme }) => theme.gaps.base};
  }
  ${({ custom }) =>
    !custom &&
    css`
      button {
        width: 100%;
      }
    `}
`;

export default BottomFixedButton;
