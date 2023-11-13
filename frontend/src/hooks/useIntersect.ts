import { useEffect, useRef } from 'react';

/**
 * Must use useCallback func to, because it'll be used as effect dependency
 */
const useIntersect = (callback: () => void) => {
  const intersectObserverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      callback();
    });
    if (intersectObserverRef.current) {
      observer.observe(intersectObserverRef.current);
    }
    return () => observer.disconnect();
  }, [callback]);

  return intersectObserverRef;
};

export default useIntersect;
