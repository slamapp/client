import styled from "@emotion/styled";
import { useNavigationContext } from "~/contexts/hooks";
import { ErrorMessage } from "../components/domain";

export default function Custom500() {
  const { useMountPage } = useNavigationContext();
  useMountPage("PAGE_ERROR");

  return (
    <PageContainer>
      <ErrorMessage
        title={"시스템 문제로 페이지를 표시할 수 없어요. 😥"}
        description={"관리자에게 문의하거나 잠시 후 다시 시도해주세요."}
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
