import type { ReactNode } from "react";
import Context from "./context";
import { useInitialize, usePageSend } from "./hooks";
import { sendPageview } from "./handle";

interface Props {
  children: ReactNode;
}

const AnalyticsProvider = ({ children }: Props) => {
  useInitialize();
  usePageSend();

  return (
    <Context.Provider value={{ sendPageview }}>{children}</Context.Provider>
  );
};

export default AnalyticsProvider;
