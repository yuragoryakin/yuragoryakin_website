import type { FC } from 'react';
import { cn } from '@/lib/utils';

type IntroSectionProps = {
  content: string;
  isMobile: boolean;
};

const IntroSection: FC<IntroSectionProps> = ({ content, isMobile }) => {
  return (
    <p className={cn(
      "font-semibold text-primary text-left text-[clamp(2rem,1.6421rem+1.7897vw,2.5rem)] leading-[1.15]",
      isMobile ? 'w-full' : 'w-[clamp(624px,50vw+112px,1000px)] max-w-[1210px] lg:text-[48px] xl:text-[55px] 2xl:text-[64px]'
    )}>
      {content}
    </p>
  );
};

export default IntroSection;
