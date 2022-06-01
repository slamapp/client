import type { FC } from "react";
import { useCallback, useReducer, useEffect } from "react";
import type { ContextProps } from "./context";
import Context from "./context";
import { reducer, initialData } from "./reducer";

const NavigationProvider: FC = ({ children }) => {
  const [navigationProps, dispatch] = useReducer(reducer, initialData);

  const useMountPage: ContextProps["useMountPage"] = (currentPageType) =>
    useEffect(() => {
      dispatch({ type: currentPageType });

      return () => dispatch({ type: "PAGE_NONE" });
    }, []);

  const setIsTopTransparent: ContextProps["setIsTopTransparent"] = (
    isTopTransparent
  ) =>
    dispatch({
      type: "NAVIGATION_SET_IS_TOP_TRANSPARENT",
      payload: { isTopTransparent },
    });

  const useDisableTopTransparent: ContextProps["useDisableTopTransparent"] =
    () =>
      useEffect(() => {
        setIsTopTransparent(false);

        return () => setIsTopTransparent(true);
      }, []);

  const setNavigationEvent: ContextProps["setNavigationEvent"] = useCallback(
    (events = { back: null, customButton: null }) =>
      dispatch({ type: "EVENT_BIND", payload: { events } }),
    []
  );

  const setCustomButtonEvent: ContextProps["setCustomButtonEvent"] =
    useCallback(
      (title, handleClick) =>
        dispatch({
          type: "EVENT_BIND_CUSTOM_BUTTON",
          payload: { title, handleClick },
        }),
      []
    );

  const useMountCustomButtonEvent: ContextProps["useMountCustomButtonEvent"] = (
    customButtonName,
    handleClick
  ) =>
    useEffect(() => {
      setCustomButtonEvent(customButtonName, handleClick);

      return clearNavigationEvent;
    }, []);

  const clearNavigationEvent: ContextProps["clearNavigationEvent"] =
    useCallback(() => {
      dispatch({ type: "EVENT_CLEAR" });
    }, []);

  const setNavigationTitle: ContextProps["setNavigationTitle"] = useCallback(
    (title) => {
      dispatch({ type: "NAVIGATION_SET_TITLE", payload: { title } });
    },
    []
  );

  return (
    <Context.Provider
      value={{
        navigationProps,
        useMountPage,
        setNavigationTitle,
        setNavigationEvent,
        setCustomButtonEvent,
        clearNavigationEvent,
        setIsTopTransparent,
        useDisableTopTransparent,
        useMountCustomButtonEvent,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default NavigationProvider;
