import styled from "@emotion/styled";
import type { ReactNode } from "react";
import Icon from "../Icon";
import Text from "../Text";

interface Props {
  children?: ReactNode;
  href?: string;
  active?: boolean;
  __TYPE?: "BreadcrumbItem";
  [x: string]: any;
}

const BreadcrumbItem = ({
  children,
  href,
  active = false,
  __TYPE,
  ...props
}: Props) => (
  <BreadcrumbItemContainer {...props}>
    <Anchor href={href}>
      <Text size={14} strong={active}>
        {children}
      </Text>
    </Anchor>
    {!active && <Icon name="chevron-right" size={22} strokeWidth={1} />}
  </BreadcrumbItemContainer>
);

const BreadcrumbItemContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

BreadcrumbItem.defaultProps = {
  __TYPE: "BreadcrumbItem",
};

BreadcrumbItem.propTypes = {
  __TYPE: "BreadcrumbItem",
};

export default BreadcrumbItem;
