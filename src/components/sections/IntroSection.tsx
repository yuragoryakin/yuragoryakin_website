import type { FC } from 'react';
import { cn } from '@/lib/utils';

type IntroSectionProps = {
  isMobile: boolean;
};

const content =
  "Hi, I'm Yura — a Product Designer passionate about transforming complex challenges into good-looking and easy-to-use products.";

const IntroSection: FC<IntroSectionProps> = ({ isMobile }) => {
  return (
    <p
      className={cn(
        'font-semibold text-primary text-left text-[clamp(2rem,1.6421rem+1.7897vw,2.5rem)] leading-[1.15]',
        isMobile
          ? 'w-full'
          : 'w-[clamp(624px,50vw+112px,1000px)] max-w-[1210px] lg:text-[48px] xl:text-[55px] 2xl:text-[64px]'
      )}
    >
      {content}
    </p>
  );
};

export default IntroSection;
