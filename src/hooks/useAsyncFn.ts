import type { DependencyList } from "react";
import { useCallback, useRef, useState } from "react";

export type AsyncFn = (...args: any[]) => Promise<any>;

interface StateProps {
  isLoading: boolean;
  value?: undefined;
  error?: undefined;
}

const useAsyncFn = (
  fn: AsyncFn,
  deps: DependencyList
): [state: StateProps, callback: AsyncFn] => {
  const lastCallId = useRef(0);
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    value: undefined,
    error: undefined,
  });

  const callback = useCallback((...args) => {
    const callId = lastCallId.current + 1;

    if (!state.isLoading) {
      setState({ ...state, isLoading: true });
    }

    return fn(...args).then(
      (value) => {
        if (callId === lastCallId.current) {
          setState({ value, isLoading: false });
        }

        return value;
      },
      (error) => {
        if (callId === lastCallId.current) {
          setState({ error, isLoading: false });
        }

        return error;
      }
    );
    // eslint-disable-next-line
  }, deps);

  return [state, callback];
};

export default useAsyncFn;
