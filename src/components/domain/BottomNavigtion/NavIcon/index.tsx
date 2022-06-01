import Link from "next/link";
import { Icon } from "~/components/base";
import type { FeatherIconNameType } from "~/components/base/Icon";
import { useNavigationContext } from "~/contexts/hooks";
import type { PageType } from "~/contexts/NavigationProvider/actionTypes";

interface Props {
  href: string;
  iconName: FeatherIconNameType;
  pageTypes: PageType[];
}

const NavIcon = ({ href, iconName, pageTypes }: Props) => {
  const { navigationProps } = useNavigationContext();
  const { currentPage } = navigationProps;

  return (
    <Link href={href} key={href} passHref>
      <a>
        <Icon
          name={iconName}
          size={24}
          color={
            pageTypes.some((item) => item === currentPage) ? "black" : "#cfcfcf"
          }
        />
      </a>
    </Link>
  );
};

NavIcon.Favorites = () => (
  <NavIcon href={"/"} iconName={"star"} pageTypes={["PAGE_FAVORITES"]} />
);
NavIcon.Map = () => (
  <NavIcon href={"/courts"} iconName={"map"} pageTypes={["PAGE_MAP"]} />
);
NavIcon.Reservations = () => (
  <NavIcon
    href={"/reservations"}
    iconName={"calendar"}
    pageTypes={["PAGE_RESERVATIONS"]}
  />
);
NavIcon.Chat = () => (
  <NavIcon
    href={"/chat/list"}
    iconName={"message-circle"}
    pageTypes={[
      "PAGE_USER_CHATROOM",
      "PAGE_COURT_CHATROOM",
      "PAGE_CHATROOM_LIST",
    ]}
  />
);
NavIcon.newCourt = () => (
  <NavIcon
    href={"/admin/newcourts"}
    iconName={"check-square"}
    pageTypes={["PAGE_ADMIN_NEWCOURTS"]}
  />
);
NavIcon.Login = () => (
  <NavIcon href={"/login"} iconName={"log-in"} pageTypes={["PAGE_LOGIN"]} />
);

export default NavIcon;
