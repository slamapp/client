import styled from "@emotion/styled";
import Link from "next/link";
import type { CSSProperties } from "react";
import React from "react";
import { Button, Icon, Image, Spacer, Text } from "~/components/base";

interface Props {
  title: string;
  description: string;
  buttonTitle?: string;
  style?: CSSProperties;
}

const ErrorMessage = ({ title, description, buttonTitle, style }: Props) => {
  return (
    <WrapperSpacer gap="base" type="vertical" style={style}>
      <Image src={"/assets/error.svg"} alt="error" />
      <Spacer gap="xxs" type="vertical" style={{ textAlign: "center" }}>
        <Text size="md" block strong>
          {title}
        </Text>
        <TextGray size="xs">{description}</TextGray>
      </Spacer>
      <Link href="/courts" passHref>
        <SearchButton fullWidth>
          <SearchIcon name="map" size="sm" color="white" />
          {buttonTitle}
        </SearchButton>
      </Link>
      <div style={{ height: 40 }}></div>
    </WrapperSpacer>
  );
};

export default ErrorMessage;

const TextGray = styled(Text)`
  color: ${({ theme }) => theme.colors.gray500};
`;

const SearchButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled(Icon)`
  margin-right: 5px;
`;

const WrapperSpacer = styled(Spacer)`
  height: 80%;
  align-items: center;
  justify-content: center;
`;
