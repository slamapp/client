import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { DEFAULT_PROFILE_IMAGE_URL } from "~/constants";
import ImageComponent from "../Image";
import AvatarGroup from "./AvatarGroup";
import type { AvatarShape } from "./types";

export interface Props {
  className?: string;
  lazy?: boolean;
  threshold?: number;
  src: string;
  size?: "sm" | "md" | "lg" | number;
  shape?: AvatarShape;
  placeholder?: string;
  alt?: string;
  mode?: "cover" | "fill" | "contain";
  __TYPE: "Avatar";
  isEdit?: boolean;
}

const Avatar = ({
  className,
  lazy,
  threshold,
  src,
  size = 70,
  shape = "round",
  placeholder,
  alt = "avatar",
  mode = "cover",
  __TYPE = "Avatar",
  isEdit = false,
  ...props
}: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper className={className} shape={shape} size={size} {...props}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        src={src ?? DEFAULT_PROFILE_IMAGE_URL}
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={src && { opacity: loaded ? 1 : 0 }}
      />
      {isEdit ? (
        <Filter>
          <span>+</span>
        </Filter>
      ) : null}
    </AvatarWrapper>
  );
};

interface AvatarWrapperProps {
  shape: AvatarShape;
  size?: "sm" | "md" | "lg" | number;
  className?: string;
}

const ShapeToCssValue = {
  circle: "50%",
  round: "4px",
  square: "0px",
};

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  background-color: #eee;
  overflow: hidden;
  :hover {
    cursor: pointer;
  }

  > img {
    transition: opacity 0.2s ease;
    width: ${({ size, theme }) =>
      typeof size === "string" && theme.avatarSizes[size]};
    height: ${({ size, theme }) =>
      typeof size === "string" && theme.avatarSizes[size]};
  }

  > img {
  }
`;

const Filter = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  font-size: 50px;
  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  }
`;

Avatar.defaultProps = {
  __TYPE: "Avatar",
};

Avatar.Group = AvatarGroup;

export default Avatar;
