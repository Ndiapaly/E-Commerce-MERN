import React, { useState } from 'react';
import { Skeleton } from '@mui/material';

const OptimizedImage = ({ src, alt, width, height, className, style }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  // Générer les srcSet pour différentes tailles d'écran
  const generateSrcSet = () => {
    const sizes = [320, 480, 768, 1024, 1280];
    return sizes
      .map((size) => {
        // Ici, vous pouvez implémenter votre logique de redimensionnement d'image
        // Pour l'exemple, nous utilisons la même image
        return `${src} ${size}w`;
      })
      .join(', ');
  };

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          animation="wave"
        />
      )}
      {!error ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={{
            ...style,
            display: isLoading ? 'none' : 'block',
            objectFit: 'cover',
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          srcSet={generateSrcSet()}
          sizes="(max-width: 320px) 280px,
                 (max-width: 480px) 440px,
                 (max-width: 768px) 728px,
                 (max-width: 1024px) 984px,
                 1280px"
        />
      ) : (
        <div
          style={{
            width,
            height,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '0.875rem',
          }}
        >
          Image non disponible
        </div>
      )}
    </>
  );
};

export default OptimizedImage;
