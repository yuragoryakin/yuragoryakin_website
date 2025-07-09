import type { FC } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type ImageItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  'data-ai-hint': string;
};

type AboutSectionProps = {
  content: string[][];
  images?: ImageItem[];
  isMobile: boolean;
  isTallScreen: boolean;
};

const AboutSection: FC<AboutSectionProps> = ({
  content,
  images,
  isMobile,
  isTallScreen,
}) => {
  const [col1, col2] = content;
  const isSpecialTallLayout = isTallScreen && !isMobile;

  const imageElements = images && (
    <div
      className={cn(
        !isSpecialTallLayout && 'mt-8',
        'flex flex-row items-start gap-4'
      )}
    >
      {images.map(({ src, alt, 'data-ai-hint': dataAiHint }, imgIndex) => (
        <div key={imgIndex} className="relative aspect-square w-1/2">
          <Image
            src={src}
            alt={alt}
            fill
            className="rounded-lg object-cover"
            data-ai-hint={dataAiHint}
          />
        </div>
      ))}
    </div>
  );

  if (isSpecialTallLayout) {
    return (
      <div className="w-full flex flex-row gap-[clamp(4rem,calc(0.0078125vw-4rem),12rem)]">
        <div className="flex-1 space-y-4">
          {[...col1, ...col2].map((p, i) => (
            <p key={i} className="font-normal text-primary">
              {p}
            </p>
          ))}
        </div>
        <div className="flex-1">{imageElements}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full',
        isMobile
          ? 'flex flex-col gap-y-8'
          : 'flex flex-row gap-[clamp(4rem,calc(0.0078125vw-4rem),12rem)]'
      )}
    >
      <div className={cn('space-y-4', !isMobile && 'flex-1')}>
        {col1.map((p, i) => (
          <p key={i} className="font-normal text-primary">
            {p}
          </p>
        ))}
      </div>
      <div className={cn('flex flex-col', !isMobile && 'flex-1')}>
        <div className="space-y-4">
          {col2.map((p, i) => (
            <p key={i} className="font-normal text-primary">
              {p}
            </p>
          ))}
        </div>
        {imageElements}
      </div>
    </div>
  );
};

export default AboutSection;
