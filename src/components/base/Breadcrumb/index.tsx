import styled from "@emotion/styled";
import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import BreadcrumbItem from "./BreadcrumbItem";

interface Props {
  children?: ReactNode;
  [x: string]: any;
}

const Breadcrumb = ({ children, ...props }: Props) => {
  const items = Children.toArray(children)
    .filter((element) => {
      if (
        isValidElement(element) &&
        element.props.__TYPE === "BreadcrumbItem"
      ) {
        return true;
      }

      console.warn("Only accepts Breadcrumb.Item as it's children.");

      return false;
    })
    .map((item, index, elements) => {
      const element = item as ReactElement;

      return cloneElement(element, {
        ...element.props,
        active: index === elements.length - 1,
      });
    });

  return <BreadcrumbContainer>{items}</BreadcrumbContainer>;
};

const BreadcrumbContainer = styled.nav`
  display: inline-block;
`;

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
