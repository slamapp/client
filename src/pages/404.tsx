import styled from "@emotion/styled";
import { useNavigationContext } from "~/contexts/hooks";
import { ErrorMessage } from "../components/domain";

export default function Custom404() {
  const { useMountPage } = useNavigationContext();
  useMountPage("PAGE_ERROR");

  return (
    <PageContainer>
      <ErrorMessage
        title={"원하시는 페이지를 찾을 수 없어요. 🤔"}
        description={"내 주변 농구장을 찾으러 가보는 건 어떨까요?"}
        buttonTitle={"지도에서 내 주변 농구장 찾기"}
      />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0 ${({ theme }) => theme.gaps.base};
`;
