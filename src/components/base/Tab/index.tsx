import styled from "@emotion/styled";
import type { ReactElement, ReactNode } from "react";
import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
} from "react";
import TabItem from "./TabItem";

interface Props {
  children?: ReactNode;
  active?: boolean;
  onClick?: (param?: any) => void;
  [x: string]: any;
}

const Tab = ({
  children,
  active = false,
  onClick = () => {},
  ...props
}: Props) => {
  const [currentActive, setCurrentActive] = useState(() => {
    if (active) {
      return active;
    } else {
      const {
        props: { index },
      } = childrenToArray(children, "Tab.Item")[0] as ReactElement;

      return index;
    }
  });

  const items = useMemo(() => {
    return childrenToArray(children, "Tab.Item").map((item) => {
      const element = item as ReactElement;

      return cloneElement(element, {
        ...element.props,
        key: element.props.index,
        active: element.props.index === currentActive,
        onClick: () => {
          setCurrentActive(element.props.index);
          onClick(element.props.index);
        },
      });
    });
  }, [children, currentActive]);

  const activeItem = useMemo(
    () => items.find((element) => currentActive === element.props.index),
    [currentActive, items]
  );

  return (
    <div>
      <TabItemContainer>{items}</TabItemContainer>
      <div>{activeItem?.props.children}</div>
    </div>
  );
};

const TabItemContainer = styled.div`
  display: flex;
  position: sticky;
  align-self: flex-start;
  box-shadow: ${({ theme }) => theme.boxShadows.sm};
  top: 56px;
`;

const childrenToArray = (children: ReactNode, types: "Tab.Item") => {
  return Children.toArray(children).filter((item) => {
    const element = item as ReactElement<{ __TYPE: string }>;
    if (isValidElement(element) && types.includes(element.props.__TYPE)) {
      return true;
    }

    console.warn(
      `Only accepts ${
        Array.isArray(types) ? types.join(", ") : types
      } as it's children.`
    );

    return false;
  });
};

Tab.Item = TabItem;

export default Tab;
