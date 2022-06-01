import type { ReactNode } from "react";
import { createContext } from "react";
import type { PageType } from "./actionTypes";
import type { DataProps } from "./reducer";
import { initialData } from "./reducer";
import type { Events } from "./types";

export interface ContextProps {
  navigationProps: DataProps;
  useMountPage: (pageType: PageType) => void;
  setNavigationEvent: (events: Events) => void;
  setCustomButtonEvent: (title: string, handleClick: any) => void;
  setIsTopTransparent: (issTopTransparent: boolean) => void;
  useDisableTopTransparent: () => void;
  useMountCustomButtonEvent: (
    customButtonName: string,
    handleClick: (...args: any[]) => void
  ) => void;
  clearNavigationEvent: () => void;
  setNavigationTitle: (title: ReactNode) => void;
}

const initialContext = {
  navigationProps: initialData,
  useMountPage: () => {},
  setNavigationEvent: () => {},
  setCustomButtonEvent: () => {},
  setIsTopTransparent: () => {},
  useDisableTopTransparent: () => {},
  useMountCustomButtonEvent: () => {},
  clearNavigationEvent: () => {},
  setNavigationTitle: () => {},
};

const Context = createContext<ContextProps>(initialContext);

export default Context;
