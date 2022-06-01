import type { HTMLAttributes, FocusEvent, ChangeEvent } from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Label, Text } from "~/components/base";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  value?: string | number;
  visibleError?: boolean;
  isRequired?: boolean;
  min?: number;
  max?: number;
  required?: boolean;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  autoFocus?: boolean;
}

const Input = ({
  label,
  isRequired,
  type,
  visibleError,
  max,
  ...props
}: Props) => {
  const [isFocus, setFocus] = useState(false);

  const handleToggle = () => {
    setFocus(!isFocus);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
    handleToggle();
  };

  return (
    <div>
      <label>
        <Label isRequired={isRequired}>{label}</Label>
        <Container
          className={isFocus ? "focus" : visibleError ? "error" : ""}
          style={type === "number" ? { display: "flex" } : {}}
        >
          <InputContent
            {...props}
            maxLength={max}
            type={type}
            onFocus={handleFocus}
            onBlur={handleToggle}
            style={type === "number" ? { textAlign: "right" } : {}}
          />
          {type === "number" ? <Text strong>개</Text> : null}
        </Container>
      </label>
    </div>
  );
};

export default Input;

const Container = styled.div`
  ${({ theme }) => css`
    box-sizing: border-box;
    width: 100%;
    background-color: ${theme.colors.white};
    padding: ${theme.inputPadding};
    border-radius: ${theme.borderRadiuses.lg};
    border: 1px solid ${theme.colors.gray300};

    &.focus {
      border: 1px solid ${theme.colors.slam.orange.strong};
    }

    &.error {
      border: 1px solid ${theme.colors.red.strong};
    }
  `}
`;

const InputContent = styled.input`
  ${({ theme }) => css`
    box-sizing: border-box;
    width: 100%;
    color: ${theme.colors.gray900};
    font-weight: bold;
    border: none;

    &::placeholder {
      color: ${theme.colors.gray300};
    }

    &:focus {
      outline: none;
    }

    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  `}
`;
