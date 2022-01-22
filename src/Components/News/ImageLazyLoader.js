import React, { useEffect, useState, useRef } from 'react';
import { CircularProgress, Skeleton } from '@mui/material';

const ImageLazyLoader = ({
  src,
  reservedHeight = '300px',
  imgStyles = {},
  observerOptions = { rootMargin: '0px', threshold: 0.0 },
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const onChange = (entries) => {
      const el = entries[0];

      if (el.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    };
    const observer = new IntersectionObserver(onChange, observerOptions);

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={containerRef}>
      {isLoaded ? null : (
        <Skeleton
          animation="wave"
          height={reservedHeight}
          sx={{
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          variant="rectangular"
          width={300}>
          <CircularProgress sx={{ visibility: 'visible' }} />
        </Skeleton>
      )}

      {isVisible ? (
        <img alt="" src={src} style={imgStyles} onLoad={handleLoad} />
      ) : null}
    </div>
  );
};

export default ImageLazyLoader;
