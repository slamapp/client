import type { NextPage } from "next";
import React from "react";
import { withRouteGuard } from "~/hocs";

const ChatroomPage: NextPage = withRouteGuard("private", () => {
  return <div>Chatroom Page</div>;
});

export default ChatroomPage;
