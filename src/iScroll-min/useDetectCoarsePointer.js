import { useEffect, useState, useMemo } from 'react';

export const useDetectCoarsePointer = () => {
  /** create mediaQueryList  */
  const mediaQueryList = useMemo(
    () => window.matchMedia('(pointer: coarse)'),
    []
  );

  /* state to hold match result */
  const [hasCoarsePointer, setHasCoarsePointer] = useState(
    mediaQueryList.matches
  );
  useEffect(() => {
    const onChange = (e) => setHasCoarsePointer(e.matches);

    /* register change listene */
    mediaQueryList.addEventListener('change', onChange);

    /* remove change listener on un-mount */
    return () => mediaQueryList.removeEventListener('change', onChange);
  }, [mediaQueryList]);

  return hasCoarsePointer;
};
