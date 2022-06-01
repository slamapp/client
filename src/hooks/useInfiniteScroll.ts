import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (
  target: RefObject<HTMLElement>,
  loadMore: any,
  threshold = 1.0
) => {
  const [isFetching, setIsFetching] = useState(false);
  const [intersectionObserver, setIntersectionObserver] =
    useState<IntersectionObserver>();

  useEffect(() => {
    setIntersectionObserver(
      new IntersectionObserver(
        (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting && !isFetching) {
              setIsFetching(true);
              await loadMore();
              setIsFetching(false);
            }
          });
        },
        { threshold }
      )
    );
  }, [isFetching, loadMore, threshold]);

  useEffect(() => {
    const el = target.current;

    if (el && intersectionObserver) {
      intersectionObserver.observe(el);
    }

    return () => {
      if (el) {
        intersectionObserver?.unobserve(el);
      }
    };
  }, [target, intersectionObserver]);

  return [isFetching];
};

export default useInfiniteScroll;
