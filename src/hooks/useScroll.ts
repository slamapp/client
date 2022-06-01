import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import useRafState from "./useRafState";

interface StateProps {
  x: number;
  y: number;
}

const useScroll = <T extends HTMLElement>(): [
  ref: RefObject<T>,
  state: StateProps
] => {
  const [state, setState] = useRafState<StateProps>({ x: 0, y: 0 });
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const handleScroll = () => {
      setState({
        x: ref.current!.scrollLeft,
        y: ref.current!.scrollTop,
      });
    };

    element.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [ref, setState]);

  return [ref, state];
};

export default useScroll;
