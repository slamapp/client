import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "@emotion/styled";
import Router from "next/router";
import { useInterval, useTimeout } from "~/hooks";

const TopPageLoader = () => {
  const [isProgressBar, setIsProgressBar] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useInterval(() => {
    if (percentage < 100) {
      setPercentage((prev) => prev + (90 - prev) / 20);
    }
  }, 100);

  useEffect(() => {
    if (!isProgressBar) {
      setPercentage(100);
    }
  }, [isProgressBar]);

  useEffect(() => {
    setPercentage(() => 60);
    Router.events.on("routeChangeStart", () => setIsProgressBar(true));
    Router.events.on("routeChangeComplete", () => setIsProgressBar(false));
    Router.events.on("routeChangeError", () => setIsProgressBar(false));
  }, []);

  useTimeout(() => {
    setIsProgressBar(false);
  }, 2000); // TODO: 제거 필요!! 농구장에서 새로고침시 router.events.on 동작 안함

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        {isProgressBar && (
          <ProgressBar
            initial={{ width: `0%` }}
            animate={{ width: `${Math.floor(percentage)}%` }}
            exit={{ width: `100%`, height: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};

const ProgressBar = styled(motion.div)`
  border-radius: 0 16px 16px 0;
  height: 8px;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background-color: #f6f7f8;
  background: linear-gradient(to right, #f6f4f1 8%, #e9e5e1 18%, #f6f4f1 33%);
  background-size: 800px 104px;
  position: relative;
  @keyframes placeHolderShimmer {
    0% {
      background-position: -800px 0;
    }
    100% {
      background-position: 800px 0;
    }
  }
`;

const Container = styled.div`
  width: 100%;
`;

export default TopPageLoader;
