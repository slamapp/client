import { createContext } from "react";

export interface ContextProps {
  sendPageview: (pathname: string) => void;
}

const Context = createContext<ContextProps>({} as ContextProps);

export default Context;
