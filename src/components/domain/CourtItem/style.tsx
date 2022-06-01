import styled from "@emotion/styled";

import { Text } from "~/components/base";

const SubHeaderArea = styled.div`
  height: 50px;
`;

const SubHeader = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const AddressText = styled(SubHeader)`
  color: ${({ theme }) => theme.colors.gray700};
`;

const SUNDAY_INDEX = 0;
const SATURDAY_INDEX = 6;

const DayOfTheWeek = styled(Text)<{ index: number }>`
  margin-bottom: 10px;
  color: ${({ index, theme }) => {
    if (index === SUNDAY_INDEX) {
      return theme.colors.red.middle;
    } else if (index === SATURDAY_INDEX) {
      return theme.colors.blue.middle;
    } else {
      return theme.colors.gray700;
    }
  }};
`;

export { SubHeaderArea, AddressText, DayOfTheWeek };
