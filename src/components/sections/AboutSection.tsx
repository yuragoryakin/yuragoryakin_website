import type { FC } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { SectionData } from '@/types';

type ImageItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  'data-ai-hint': string;
};

type AboutSectionProps = {
  isMobile: boolean;
  isTallScreen: boolean;
};

const aboutData: Pick<SectionData, 'content' | 'images'> = {
  content: [
    [
      "I had never understood why I was so bothered by poorly designed mobile apps, websites, software, or game interfaces while other people couldn't share my suffering and most of the time even struggled to acknowledge its roots. Until I realized: I could be the person who creates something better, who actually cares about people on the other side of a product. Since then, my emotional response to mediocre design hasn't changed much, but now I can channel that into my profession instead of it being a mere quirky fixation with interfaces.",
      'Unique combination of traditional architectural education with modern research-based psychology allows me to deeply understand user thought processes and needs, thereby crafting experiences that are both intuitive and visually compelling.',
    ],
    [
      "I thrive on complex products. Whether it's diverse user needs and stories, complex business logic, or dense data structures, I love transforming them into clear, functional, and user-friendly designs.",
      'Outside of design, I find joy in composing music and playing guitar, creating with my hands through woodworking, and exploring nature with my wife and our twisted-tail dog, Beemo.',
    ],
  ],
  images: [
    {
      src: '/about-1.JPG',
      alt: 'A person standing in a grassy field holding white flowers, with a dog nearby.',
      width: 400,
      height: 400,
      'data-ai-hint': 'person field',
    },
    {
      src: '/about-2.jpg',
      alt: 'A person sitting at a desk with a computer, headphones, and plants.',
      width: 400,
      height: 400,
      'data-ai-hint': 'person desk',
    },
  ],
};

const AboutSection: FC<AboutSectionProps> = ({
  isMobile,
  isTallScreen,
}) => {
  const { content, images } = aboutData;
  const [col1, col2] = content as string[][];
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
