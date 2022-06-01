import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import type { GutterType } from "./types";

interface ProviderProps {
  children: ReactNode;
  gutter: GutterType;
}

interface ContextProps {
  gutter: GutterType;
}

const FluxContext = createContext<ContextProps>({ gutter: 0 });
export const useFlux = () => useContext(FluxContext);

const FluxProvider = ({ children, gutter = 0 }: ProviderProps) => {
  return (
    <FluxContext.Provider value={{ gutter }}>{children}</FluxContext.Provider>
  );
};

export default FluxProvider;
