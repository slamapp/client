import React from "react";
import Head from "next/head";
import { useNavigationContext } from "@contexts/NavigationProvider";
import { NextPage } from "next";

const Activity: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage((page) => page.ACTIVITY);

  return (
    <div>
      <Head>
        <title>활동 | Slam - 우리 주변 농구장을 빠르게</title>
      </Head>
      Activity
    </div>
  );
};

export default Activity;
