import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { useMemo } from "react";
import FluxProvider, { useFlux } from "./FluxProvider";

interface Props {
  children?: ReactNode;
  span?: number;
  offset?: number;
  [x: string]: any;
}

const Col = ({
  children,
  span = undefined,
  offset = undefined,
  ...props
}: Props) => {
  const { gutter } = useFlux();
  const gutterStyle = useMemo(() => {
    if (Array.isArray(gutter)) {
      const horizontalGutter = gutter[0];
      const verticalGutter = gutter[1];

      return {
        paddingTop: `${verticalGutter / 2}px`,
        paddingBottom: `${verticalGutter / 2}px`,
        paddingLeft: `${horizontalGutter / 2}px`,
        paddingRight: `${horizontalGutter / 2}px`,
      };
    } else {
      return {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`,
      };
    }
  }, [gutter]);

  return (
    <FluxProvider gutter={gutter}>
      <StyledCol
        {...props}
        style={{ ...props.style, ...gutterStyle }}
        span={span}
        offset={offset}
      >
        {children}
      </StyledCol>
    </FluxProvider>
  );
};

export default Col;

interface StyledColProps {
  span?: number;
  offset?: number;
}

const StyledCol = styled.div<StyledColProps>`
  max-width: 100% fit-content;
  box-sizing: border-box;

  width: ${({ span }) => span && `${(span / 12) * 100}%`};
  margin-left: ${({ offset }) => offset && `${(offset / 12) * 100}%`};
`;
