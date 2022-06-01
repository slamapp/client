import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Text } from "~/components/base";

export const ModalContent = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  margin-top: 15px;
  gap: ${({ theme }) => theme.gaps.sm};
`;

export const ContentWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.xs};
`;

export const AvatarGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TimeSlotText = styled(Text)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  ${({ isPlaceHolder, theme }) =>
    isPlaceHolder &&
    css`
      color: ${theme.colors.gray400};
      font-weight: 500;
    `};
`;
