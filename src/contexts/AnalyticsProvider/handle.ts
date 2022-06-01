import GA from "react-ga4";
import type { ContextProps } from "./context";

export const sendPageview: ContextProps["sendPageview"] = (
  pathname: string
) => {
  GA.send({ hitType: "pageview", page: pathname });
};
