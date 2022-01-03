import { useEffect, useState, useMemo } from 'react';

const CHANGE_EVENT = 'change';
export const useDetectCoarsePointer = () => {
  /** create mediaQueryList  */
  const mediaQueryList = useMemo(
    () => window.matchMedia('(pointer: coarse)'),
    [],
  );

  /* state to hold match result */
  const [hasCoarsePointer, setHasCoarsePointer] = useState(
    mediaQueryList.matches,
  );

  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => setHasCoarsePointer(e.matches);

    /* register change listener */
    mediaQueryList.addEventListener(CHANGE_EVENT, onChange);

    /* remove change listener on un-mount */
    return () => mediaQueryList.removeEventListener(CHANGE_EVENT, onChange);
  }, [mediaQueryList]);

  return hasCoarsePointer;
};
