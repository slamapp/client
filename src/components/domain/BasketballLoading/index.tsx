import type { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import LoaderBasketball from "./LoaderBasketball";

interface Props {
  children?: ReactNode;
}

const BasketballLoading: FC<Props> = ({ children }) => {
  return (
    <LoadingWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: -90,
        }}
      >
        <LoaderBasketball />
        {children}
      </div>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
`;

export default BasketballLoading;
