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
  ...props 
}: SmartImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''} ${wrapperClassName}`}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`transition-opacity duration-700 ease-out ${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
