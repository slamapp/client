import type { ReactChild } from "react";
import { createContext } from "react";
import type { PageType } from "./actionTypes";
import { pageType } from "./actionTypes";
import type { DataProps } from "./reducer";
import { initialData } from "./reducer";
import type { Events, GetPageType } from "./types";

export interface ContextProps {
  navigationProps: DataProps;
  pageType: PageType;
  useMountPage: (getPageType: GetPageType) => void;
  setNavigationTitle: (title: ReactChild) => void;
  setNavigationEvent: (events: Events) => void;
  setCustomButtonEvent: (title: string, handleClick: any) => void;
  clearNavigationEvent: () => void;
  setIsTopTransparent: (nextIsTopTransparent: boolean) => void;
  useDisableTopTransparent: () => void;
  useMountCustomButtonEvent: (
    customButtonName: string,
    handleClick: (...args: any[]) => void
  ) => void;
}

const initialContext = {
  navigationProps: initialData,
  pageType,
  useMountPage: () => {},
  setNavigationTitle: () => {},
  setNavigationEvent: () => {},
  setCustomButtonEvent: () => {},
  clearNavigationEvent: () => {},
  setIsTopTransparent: () => {},
  useDisableTopTransparent: () => {},
  useMountCustomButtonEvent: () => {},
};

const Context = createContext<ContextProps>(initialContext);

export default Context;
