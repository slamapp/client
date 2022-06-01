import styled from "@emotion/styled";
import { useNavigationContext } from "~/contexts/hooks";
import Text from "../Text";

interface Props {
  title?: string;
  index?: string;
  active?: boolean;
  [x: string]: any;
}

const TabItem = ({ title, index, active = false, ...props }: Props) => {
  const { navigationProps } = useNavigationContext();

  return (
    <TabItemWrapper
      active={active}
      isBackgroundTransparent={navigationProps.isTopTransparent}
      {...props}
    >
      <Text strong={active}>{title}</Text>
    </TabItemWrapper>
  );
};

interface TabItemWrapperProps {
  active?: boolean;
}

const TabItemWrapper = styled.div<{
  active?: boolean;
  isBackgroundTransparent: boolean;
}>`
  flex-grow: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 50px;
  cursor: pointer;
  background: rgba(
    255,
    255,
    255,
    ${({ isBackgroundTransparent }) => (isBackgroundTransparent ? 0 : 1)}
  );
  transition: background 200ms;

  :hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;

TabItem.defaultProps = {
  __TYPE: "Tab.Item",
};

export default TabItem;
