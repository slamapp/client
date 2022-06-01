import type { FC } from "react";

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  strong?: boolean;
  underline?: boolean;
  color?: string;
  [x: string]: any;
}

const Header: FC<Props> = ({
  children,
  level = 1,
  strong = false,
  underline = false,
  color,
  ...props
}) => {
  let Tag = `h${level}` as keyof JSX.IntrinsicElements;
  if (level < 1 || level > 6) {
    console.warn(
      "Header only accept `1 | 2 | 3 | 4 | 5 | 6 |` as `level` value."
    );
    Tag = "h1";
  }

  const fontStyle = {
    fontWeight: strong ? "bold" : "normal",
    textDecoration: underline ? "underline" : undefined,
    color,
  };

  return (
    <Tag style={{ ...props.style, ...fontStyle }} {...props}>
      {children}
    </Tag>
  );
};

export default Header;
