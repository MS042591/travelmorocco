"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import Skeleton from './Skeleton';

interface SmartImageProps extends ImageProps {
  wrapperClassName?: string;
}

export default function SmartImage({ 
  src, 
  alt, 
  wrapperClassName = "", 
  className = "", 
  fill,
  priority,
  ...props 
}: SmartImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''} ${wrapperClassName}`}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        className={`transition-opacity duration-700 ease-out ${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => {
          if (!priority) setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
