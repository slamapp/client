import type { ReactElement, ReactNode } from "react";
import React from "react";
import type { AvatarShape } from "./types";

interface Props {
  children: ReactNode;
  shape?: AvatarShape;
  size?: number;
}

const AvatarGroup = ({
  children,
  shape = "circle",
  size = 70,
  ...props
}: Props) => {
  const avatars = React.Children.toArray(children)
    .filter((element) => {
      if (React.isValidElement(element) && element.props.__TYPE === "Avatar") {
        return true;
      }

      console.warn("Only accepts Avatar as it's children.");

      return false;
    })
    .map((avatar, index, avatars) => {
      const item = avatar as ReactElement;

      return React.cloneElement(item, {
        ...item.props,
        size,
        shape,

        style: {
          ...item.props.style,
          marginLeft: -size / 5,
          zIndex: avatars.length - index,
        },
      });
    });

  return <div style={{ paddingLeft: size / 5 }}>{avatars}</div>;
};

export default AvatarGroup;
