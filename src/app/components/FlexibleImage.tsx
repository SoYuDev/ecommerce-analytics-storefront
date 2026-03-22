'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FlexibleImageProps } from '@/types/FlexibleImageProps';

function FlexibleImage({
  src,
  alt,
  width,
  height,
  fill = false,
  // Default sizes...
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  className = '',
}: FlexibleImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Image will be hidden until isLoading state changes.
  const imageClasses = `transition-opacity duration-500 ease-in-out ${
    isLoading ? 'opacity-0' : 'opacity-100'
  } ${className}`;

  // Skeleton animation until image is loaded
  const Skeleton = isLoading ? (
    <div
      data-testid="image-skeleton" // ID for Jest testing
      className="absolute inset-0 bg-gray-200 animate-pulse z-0"
    />
  ) : null;

  // If we use fill, width and height will not be necessary to be defined because the image
  // will be adapted to the container size, this also allow us to create a custom loading state
  if (fill) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {Skeleton}
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          className={`object-cover ${imageClasses} relative z-10`}
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      {Skeleton}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        className={`w-full h-auto ${imageClasses} relative z-10`}
      />
    </div>
  );
}

export default FlexibleImage;
