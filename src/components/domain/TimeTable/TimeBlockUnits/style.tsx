import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { TimeBlockUnitWrapperProps, StatusProps } from "../type";

const TimeTableContainer = styled.div`
  position: relative;
`;

const OneSixthColumn = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FourSixthColumn = styled.div`
  flex-grow: 4;
  flex-basis: 0;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const HourColumn = styled(OneSixthColumn)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 20px;
`;

const TimeBlockUnitWrapper = styled.div<TimeBlockUnitWrapperProps>`
  display: flex;
  height: ${({ height }) => `${height}px`};

  ${({ isEven, hasBlackTopBorder, hasBlackBottomBorder, theme }) => {
    const black = theme.colors.gray900;
    const transparentBlack = "rgb(135 135 135 / 0.2)";
    const topBorderColor = hasBlackTopBorder ? black : transparentBlack;
    const bottomBorderColor = hasBlackBottomBorder ? black : transparentBlack;

    return isEven
      ? css`
          & .time-block__hour {
            transform: translate(0, -50%);
            font-size: 30px;

            span {
              font-size: 12px;
            }
          }

          & .time-block__status,
          .time-block__ball {
            box-shadow: 0 4px 0 ${topBorderColor} inset,
              0 -2px 0 ${bottomBorderColor} inset;
          }
        `
      : css`
          & .time-block__status,
          .time-block__ball {
            box-shadow: 0 2px 0 ${topBorderColor} inset,
              0 -4px 0 ${bottomBorderColor} inset;
          }
        `;
  }}

  ${({ previous, theme }) =>
    previous &&
    css`
      & .time-block__action {
        box-shadow: 0 -4px 0 ${theme.colors.gray900} inset;
      }
    `}

    ${({ next, theme }) =>
    next &&
    css`
      & .time-block__action {
        box-shadow: 0 4px 0 ${theme.colors.gray900} inset;
      }
    `}
  
  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.colors.gray400};
      color: ${theme.colors.gray500};
      pointer-events: none;

      & .time-block__status {
        filter: grayscale(100%);
      }
    `}
`;

const HoursHorizontalDivider = styled.div`
  position: absolute;
  height: 2px;
  width: 20%;
  top: -1px;
  background-color: ${({ theme }) => theme.colors.gray900};
  opacity: 0.08;
`;

const StatusColumn = styled(FourSixthColumn)<StatusProps>`
  cursor: pointer;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "active":
        return theme.colors.slam.orange.strong;
      case "lack":
        return `rgba(254, 109, 4, 0.3)`;
      default:
        return "transparent";
    }
  }};
`;

const BallColumn = styled(OneSixthColumn)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VerticalDivider = styled.div`
  width: 8px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray900};
`;

const Selector = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  background-color: ${({ theme }) => theme.colors.gray900};
  border-radius: 16px;
  border: 8px solid ${({ theme }) => theme.colors.slam.orange.strong};
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.boxShadows.lg};
  width: ${({ hasReservation }) => hasReservation && "75%"};
  margin-left: auto;
`;

const ReservationMarker = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  ${({ top, left, width, height, selected }) => css`
    top: ${top}px;
    left: ${left}px;
    width: ${width}px;
    height: ${height}px;
    border: ${selected && "8px solid orange"};
  `};
  background-color: ${({ theme }) => theme.colors.gray900};
  color: white;
  border-radius: 16px;
  box-sizing: border-box;
`;

const NavigationBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadiuses.md};
  border: 4px solid ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  width: calc(100% - 32px);
  padding: 6px 0px;
`;

export {
  TimeTableContainer,
  OneSixthColumn,
  FourSixthColumn,
  TimeBlockUnitWrapper,
  HourColumn,
  HoursHorizontalDivider,
  StatusColumn,
  BallColumn,
  VerticalDivider,
  Selector,
  ReservationMarker,
  NavigationBlock,
};
