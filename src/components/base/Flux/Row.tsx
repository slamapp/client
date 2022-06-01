import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { useMemo } from "react";
import FluxProvider from "./FluxProvider";
import type { GutterType } from "./types";

const AlignToCSSValue = {
  top: "flex-start",
  middle: "center",
  bottom: "flex-end",
};

type TypeAlign = "top" | "middle" | "bottom";
type TypeJustify =
  | "start"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

interface Props {
  children?: ReactNode;
  justify?: TypeJustify;
  align?: TypeAlign;
  gutter?: GutterType;
  [x: string]: any;
}

const Row = ({
  children,
  align = undefined,
  justify = undefined,
  gutter = 0,
  ...props
}: Props) => {
  const gutterStyle = useMemo(() => {
    if (Array.isArray(gutter)) {
      const horizontalGutter = gutter[0];
      const verticalGutter = gutter[1];

      return {
        marginTop: `-${verticalGutter / 2}px`,
        marginBottom: `-${verticalGutter / 2}px`,
        marginLeft: `-${horizontalGutter / 2}px`,
        marginRight: `-${horizontalGutter / 2}px`,
      };
    } else {
      return {
        marginLeft: `-${gutter / 2}px`,
        marginRight: `-${gutter / 2}px`,
      };
    }
  }, [gutter]);

  return (
    <FluxProvider gutter={gutter}>
      <StyledRow
        {...props}
        align={align}
        justify={justify}
        style={{ ...props.style, ...gutterStyle }}
      >
        {children}
      </StyledRow>
    </FluxProvider>
  );
};

export default Row;

interface StyledRowProps {
  justify?: TypeJustify;
  align?: TypeAlign;
}

const StyledRow = styled.div<StyledRowProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;

  justify-content: ${({ justify = undefined }) => justify};
  align-items: ${({ align = undefined }) => align && AlignToCSSValue[align]};
`;
