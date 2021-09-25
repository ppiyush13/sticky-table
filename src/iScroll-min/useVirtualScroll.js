import { useEffect, useRef } from 'react';
import { useDetectCoarsePointer } from './useDetectCoarsePointer';
import IScroll from './iScroll';

const SCROLLER_OPTIONS = {
  mouseWheel: true,
  scrollX: true,
  freeScroll: false,
  probeType: 3,
  keyBindings: true,
  eventPassthrough: 'vertical',
  preventDefault: false,
};

export const useVirtualScroll = () => {
  const hasCoarsePointer = useDetectCoarsePointer();
  const bodyRef = useRef();
  const headerRef = useRef();
  const verticalScrollerRef = useRef();
  const virutalScrollRef = useRef();

  useEffect(() => {
    /** html elements */
    const bodyEl = bodyRef.current;
    const headerEl = headerRef.current;
    const verticalScrollerEl = verticalScrollerRef.current;

    /** create virtual scroller instance */
    const virtualScrollInstance = new IScroll(bodyEl, SCROLLER_OPTIONS);
    virutalScrollRef.current = virtualScrollInstance;
    virtualScrollInstance.on('translate', (x, y) => {
      headerEl.scrollTo(x, y);
      bodyEl.scrollTo(x, y);
      verticalScrollerEl.scrollLeft = x;
    });

    /** vertical scroll on change */
    const verticalScrollChange = () => {
      const x = verticalScrollerEl.scrollLeft;
      virtualScrollInstance.scrollTo(x * -1, 0);
    };
    verticalScrollerEl.addEventListener('scroll', verticalScrollChange);

    return () => {
      virtualScrollInstance.destroy();
      verticalScrollerEl.removeEventListener('scroll', verticalScrollChange);
    };
  }, []);

  useEffect(() => {
    if (hasCoarsePointer) virutalScrollRef.current.enableMouseEvents();
    else virutalScrollRef.current.disableMouseEvents();
  }, [hasCoarsePointer]);

  return {
    bodyRef,
    headerRef,
    verticalScrollerRef,
  };
};
