import { useCallback, useEffect } from "react";
import type { EventKeyValue } from "./EventKeyValueType";

type KeyEvent = "keydown" | "keyup";
type Handler = () => void;

const useKey = (
  targetKey: EventKeyValue,
  handler: Handler,
  event: KeyEvent = "keydown"
) => {
  const handleKey = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        handler();
      }
    },
    [targetKey, handler]
  );

  useEffect(() => {
    window.addEventListener(event, handleKey);

    return () => {
      window.removeEventListener(event, handleKey);
    };
  }, [event, targetKey, handleKey]);
};

export default useKey;
