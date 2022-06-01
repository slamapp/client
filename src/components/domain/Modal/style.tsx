import styled from "@emotion/styled";
import { Text } from "~/components/base";

const Header = styled(Text)`
  padding: 40px 0;
  text-align: center;
`;

const BottomButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

export { Header, BottomButtonContainer };
