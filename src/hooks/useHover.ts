import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const useHover = <T extends HTMLElement>(): [
  ref: RefObject<T>,
  state: boolean
] => {
  const [state, setState] = useState<boolean>(false);
  const ref = useRef<T>(null);

  const handleMouseOver = useCallback(() => setState(true), []);
  const handleMouseOut = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.addEventListener("mouseover", handleMouseOver);
    element.addEventListener("mouseout", handleMouseOut);

    return () => {
      element.removeEventListener("mouseover", handleMouseOver);
      element.removeEventListener("mouseout", handleMouseOut);
    };
  }, [ref, handleMouseOver, handleMouseOut]);

  return [ref, state];
};

export default useHover;
