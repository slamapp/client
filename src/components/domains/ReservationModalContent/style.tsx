import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Text } from "~/components/uis/atoms"

export const ModalContent = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  margin-top: 15px;
  gap: ${({ theme }) => theme.previousTheme.gaps.sm};
`

export const ContentWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.previousTheme.gaps.xs};
`

export const AvatarGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const TimeSlotText = styled(Text)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.previousTheme.fontSizes.lg};
  ${({ isPlaceHolder, theme }) =>
    isPlaceHolder &&
    css`
      color: ${theme.previousTheme.colors.gray400};
      font-weight: 500;
    `};
`
