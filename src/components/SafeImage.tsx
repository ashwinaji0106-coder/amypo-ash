import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Sri Krishna College Campus',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#F2EFE9] border border-zinc-200 text-zinc-600 p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 text-[#1B365D]/60 mb-2" aria-hidden="true" />
        <p className="text-sm font-medium text-zinc-800">{fallbackLabel}</p>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
