import type { ReactNode, HTMLAttributes } from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  size?: number | "xs" | "sm" | "base" | "md" | "lg" | "xl";
  isRequired?: boolean;
  [x: string]: any;
}

const Label = ({ size, isRequired, children, ...props }: Props) => {
  return (
    <StyledText size={size ?? "base"} strong {...props} block>
      {children}
      {isRequired ? <RequiredTag>*</RequiredTag> : null}
    </StyledText>
  );
};

export default Label;

const StyledText = styled(Text)`
  ${({ theme }) => css`
    margin-bottom: ${theme.gaps.xs};
    color: ${theme.colors.gray900};
  `}
`;

const RequiredTag = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.slam.orange.strong};
    vertical-align: text-top;
  `}
`;
