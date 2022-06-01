import type { APICourt } from "~/domainTypes/tobe";
import { withShareClick } from "~/hocs";
import { IconButton } from "~/components/base";

interface ShareProps {
  court: Pick<APICourt, "id" | "name" | "longitude" | "latitude">;
}

const Share = ({ court }: ShareProps) =>
  withShareClick("court", { court })(IconButton.Share);

export default Share;
