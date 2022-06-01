import type { NextPage } from "next";
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useNavigationContext } from "~/contexts/hooks";
import { withRouteGuard } from "~/hocs";

const ChatroomListPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage("PAGE_CHATROOM_LIST");

  return (
    <div>
      <ChatroomListItem>
        <div>hi</div>
      </ChatroomListItem>
    </div>
  );
};

export default withRouteGuard("private", ChatroomListPage);

const ChatroomListItem = styled.div`
  margin: 8px 16px;
  padding: 16px;

  ${({ theme }) => css`
    border-radius: ${theme.borderRadiuses.lg};
    background: ${theme.colors.white};
  `}
`;
