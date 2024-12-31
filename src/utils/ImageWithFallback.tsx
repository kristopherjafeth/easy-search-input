import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  style,
  fill,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? '/fallback.png' : src}
      alt={alt}
      className={className}
      style={fill ? { objectFit: 'cover', ...style } : style}
      onError={() => setHasError(true)}
    />
  );
};

export default ImageWithFallback;