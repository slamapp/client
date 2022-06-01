import styled from "@emotion/styled";
import type { MouseEvent } from "react";
import type { FeatherIconNameType } from "../Icon";
import Icon from "../Icon";
import { Share } from "./icons";

interface Props {
  name: FeatherIconNameType;
  className?: string;
  size?: "sm" | "md" | "lg";
  iconSize?: "sm" | "md" | "lg" | number;
  type?: "button" | "submit";
  iconColor?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({
  name,
  type = "button",
  iconColor,
  className,
  onClick,
  size = "lg",
  iconSize = "sm",
}: Props) => {
  return (
    <StyledIconButton
      className={className}
      type={type}
      onClick={onClick}
      size={size}
    >
      <Icon name={name} color={iconColor} size={iconSize} />
    </StyledIconButton>
  );
};

IconButton.Share = Share;

export default IconButton;

const StyledIconButton = styled.button<Required<Pick<Props, "size">>>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadiuses.lg};
  min-width: ${({ theme, size }) => theme.buttonHeights[size]};
  min-height: ${({ theme, size }) => theme.buttonHeights[size]};
  width: ${({ theme, size }) => theme.buttonHeights[size]};
  height: ${({ theme, size }) => theme.buttonHeights[size]};
  cursor: pointer;
`;
