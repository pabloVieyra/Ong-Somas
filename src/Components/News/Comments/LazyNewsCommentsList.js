import React, { useState, useEffect, useRef, Suspense } from 'react';

const NewsCommentsList = React.lazy(() => import('./NewsCommentsList'));

const LazyNewsCommentsList = () => {
  const [show, setShow] = useState(false);
  const elementRef = useRef();

  const isIntesecting = (entries) => entries[0].isIntersecting;

  const onIntersected = (entries, observer) => {
    if (isIntesecting(entries)) {
      setShow(true);
      observer.disconnect();
    }
  };

  const createObserver = () => {
    const observer = new IntersectionObserver(onIntersected, {
      rootMargin: '5px',
    });

    observer.observe(elementRef.current);
  };

  useEffect(() => {
    createObserver();
  }, []);

  return (
    <div ref={elementRef}>
      {show && (
        <Suspense fallback={null}>
          <NewsCommentsList />
        </Suspense>
      )}
    </div>
  );
};

export default LazyNewsCommentsList;
