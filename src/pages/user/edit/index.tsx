import type { NextPage } from "next";
import Head from "next/head";
import { withRouteGuard } from "~/hocs";
import { useNavigationContext } from "~/contexts/hooks";
import { ProfileForm } from "~/components/domain";

const UserEditPage: NextPage = () => {
  const { useMountPage } = useNavigationContext();
  useMountPage("PAGE_USER_EDIT");

  return (
    <div>
      <Head>
        <title>프로필 편집 | Slam - 우리 주변 농구장을 빠르게</title>
        <meta name="description" content="혼자서도 농구를 더 빠르게" />
      </Head>

      <ProfileForm />
    </div>
  );
};

export default withRouteGuard("private", UserEditPage);
