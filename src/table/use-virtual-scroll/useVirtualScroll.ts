import { useEffect, useRef } from 'react';
import { useDetectCoarsePointer } from './useDetectCoarsePointer';
import IScroll from './iscroll';

const SCROLLER_OPTIONS: IScrollOptions = {
  mouseWheel: true,
  bounce: false,
  scrollX: true,
  scrollY: false,
  freeScroll: false,
  probeType: 3,
  eventPassthrough: 'vertical',
  preventDefault: false,
  useTransition: false,
};

export const useVirtualScroll = () => {
  const hasCoarsePointer = useDetectCoarsePointer();
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollerRef = useRef<HTMLDivElement>(null);
  const virtualScrollRef = useRef<IScroll>();

  useEffect(() => {
    /** html elements */
    const bodyEl = bodyRef.current!;
    const headerEl = headerRef.current!;
    const horizontalScrollerEl = horizontalScrollerRef.current!;

    /** create virtual scroller instance */
    const virtualScrollInstance = new IScroll(bodyEl, SCROLLER_OPTIONS);
    virtualScrollRef.current = virtualScrollInstance;

    virtualScrollInstance.on('translate', ({ x, y }) => {
      headerEl.scrollTo(x, y);
      bodyEl.scrollTo(x, y);
      horizontalScrollerEl.scrollLeft = x;
    });

    return () => virtualScrollInstance.destroy();
  });

  useEffect(() => {
    const virtualScroll = virtualScrollRef.current!;
    const horizontalScrollerEl = horizontalScrollerRef.current!;

    /** vertical scroll on change */
    const onHorizontalScroll = () => {
      const x = horizontalScrollerEl.scrollLeft;

      if (x !== Math.floor(virtualScroll.x * -1))
        virtualScroll.scrollTo(x * -1, 0);
    };
    horizontalScrollerEl.addEventListener('scroll', onHorizontalScroll);

    return () =>
      horizontalScrollerEl.removeEventListener('scroll', onHorizontalScroll);
  }, []);

  useEffect(() => {
    const virtualScroll = virtualScrollRef.current!;
    if (hasCoarsePointer) virtualScroll.enableMouseEvents();
    else virtualScroll.disableMouseEvents();
  }, [hasCoarsePointer]);

  return {
    bodyRef,
    headerRef,
    horizontalScrollerRef,
  };
};
