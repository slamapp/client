import type { CSSProperties } from "react"
import styled from "@emotion/styled"
import type previousTheme from "~/styles/emotionTheme/previousTheme"
import type { Keyof } from "~/types/common"

interface Props {
  gap: Keyof<typeof previousTheme["gaps"]> | number
  type?: "vertical" | "horizontal"
  style?: CSSProperties
}

const Spacer = styled.div<Props>`
  display: flex;
  flex-direction: ${({ type }) => type === "vertical" && "column"};
  gap: ${({ theme, gap }) =>
    typeof gap === "string" ? theme.previousTheme.gaps[gap] : `${gap}px`};
`

export default Spacer
