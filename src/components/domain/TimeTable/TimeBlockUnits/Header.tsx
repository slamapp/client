import styled from "@emotion/styled";
import { Icon, Image, Text } from "~/components/base";
import * as S from "./style";

const Header: React.FC = () => {
  return (
    <TableHeader height={56}>
      <S.OneSixthColumn>
        <Icon name="clock" color="white" />
      </S.OneSixthColumn>
      <S.FourSixthColumn>
        <Icon name="users" color="white" />
        <TableHeaderText>인원 현황</TableHeaderText>
      </S.FourSixthColumn>
      <S.OneSixthColumn>
        <ImageWrapper>
          <Image src="/assets/basketball/only_ball_500.png" alt="basketball" />
        </ImageWrapper>
      </S.OneSixthColumn>
    </TableHeader>
  );
};

export default Header;

const TableHeader = styled(S.TimeBlockUnitWrapper)`
  background-color: ${({ theme }) => theme.colors.gray900};
  position: sticky;
  top: 56px;
  overflow-y: auto;
  z-index: 2000;
`;

const TableHeaderText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
`;

const ImageWrapper = styled.div`
  width: 36px;
  height: 36px;

  img {
    width: 100%;
    height: 100%;
  }
`;
