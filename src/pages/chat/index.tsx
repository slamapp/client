import type { NextPage } from "next";
import React from "react";
import { withRouteGuard } from "~/hocs";
import { useNavigationContext } from "~/contexts/hooks";

const ChatroomListPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage("PAGE_CHATROOM_LIST");

  return <div>Chatroom List Page</div>;
};

export default withRouteGuard("private", ChatroomListPage);
