import type { NextPage } from "next";
import React from "react";
import { withRouteGuard } from "~/hocs";
import { useNavigationContext } from "~/contexts/hooks";

const FollowerPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage("PAGE_USER_FOLLOWER");

  return <div>Follower Page</div>;
};

export default withRouteGuard("private", FollowerPage);
