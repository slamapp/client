import Link from "next/link";
import type { APIChatroom } from "~/domainTypes/tobe";
import { IconButton } from "~/components/base";

interface Props {
  chatroomId: APIChatroom["id"];
}

const ChatButton: React.FC<Props> = ({ chatroomId }) => {
  return (
    <Link href={`/chat/${chatroomId}`} passHref>
      <a>
        <IconButton name="message-circle" />
      </a>
    </Link>
  );
};

export default ChatButton;
