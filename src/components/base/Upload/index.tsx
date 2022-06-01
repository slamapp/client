import styled from "@emotion/styled";
import type { ChangeEvent, DragEvent, ReactNode } from "react";
import { useState } from "react";

interface Props {
  children?: ReactNode;
  name?: string;
  accept?: any;
  value?: File;
  onChange?: (file: File) => void;
  onChangeFileSrc?: (fileSrc: string) => void;
  [x: string]: any;
}

const Upload = ({
  children,
  droppable,
  name,
  accept,
  value,
  onChange,
  onChangeFileSrc,
  inputRef,
  ...props
}: Props) => {
  const [file, setFile] = useState(value);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const changedFile: File = (target.files as FileList)[0];
    setFile(changedFile);
    getFileSrc(changedFile);
  };

  const getFileSrc = (fileBlob: File) => {
    if (fileBlob) {
      const reader = new FileReader();

      const onFileLoadEnd = () => {
        reader.removeEventListener("loadend", onFileLoadEnd, false);
        if (typeof reader.result === "string") {
          onChangeFileSrc?.(reader.result);
        }
      };

      reader.addEventListener("loadend", onFileLoadEnd, false);
      reader.readAsDataURL(fileBlob);
    }
  };

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return;
    }

    e.preventDefault(); // 브라우저 기본 이벤트를 막는다.
    e.stopPropagation(); // 부모나 자식 컴포넌트로 이벤트가 전파되는 것을 막는다.

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
  };
  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;
    const changedFile = files[0];
    setFile(changedFile);
    if (onChange) {
      onChange(changedFile);
    }
    setDragging(false);
  };

  return (
    <div
      onClick={handleChooseFile}
      {...props}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <Input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
      />
      {typeof children === "function" ? children(file, dragging) : children}
    </div>
  );
};

export default Upload;

const Input = styled.input`
  display: none;
`;
