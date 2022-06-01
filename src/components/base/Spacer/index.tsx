import type { CSSProperties } from "react";
import styled from "@emotion/styled";
import type { ITheme } from "~/styles/theme";

interface Props {
  gap: keyof ITheme["gaps"] | number;
  type?: "vertical" | "horizontal";
  style?: CSSProperties;
}

const Spacer = styled.div<Props>`
  display: flex;
  flex-direction: ${({ type }) => type === "vertical" && "column"};
  gap: ${({ theme, gap }) =>
    typeof gap === "string" ? theme.gaps[gap] : `${gap}px`};
`;

export default Spacer;
