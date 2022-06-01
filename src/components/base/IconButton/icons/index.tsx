import type { MouseEvent } from "react";
import { IconButton } from "~/components/base";

interface Props {
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

export const Share = ({ onClick }: Props) => {
  return <IconButton name="share-2" onClick={onClick} />;
};
