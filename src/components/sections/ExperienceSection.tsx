import type { FC } from 'react';
import { cn } from '@/lib/utils';

type ExperienceSectionProps = {
  heading?: {
    brand: string;
    date: string;
    title: string;
  };
  content: string[][];
  isMobile: boolean;
  isTallScreen: boolean;
};

const ExperienceSection: FC<ExperienceSectionProps> = ({
  heading,
  content,
  isMobile,
  isTallScreen,
}) => {
  const [col1, col2] = content;
  const isSpecialTallLayout = isTallScreen && !isMobile;

  if (isMobile) {
    return (
      <div className="w-full">
        {heading && (
          <div className="mb-4">
            <p>
              <span className="font-medium text-primary">{heading.brand}</span>
              <span className="ml-4 font-normal text-secondary-foreground">
                {heading.date}
              </span>
            </p>
            <p className="font-medium text-secondary-foreground">
              {heading.title}
            </p>
          </div>
        )}
        <div className="space-y-4">
          {[...col1, ...col2].map((p, i) => (
            <p key={i} className="font-normal text-primary">
              {p}
            </p>
          ))}
        </div>
      </div>
    );
  }

  const firstColumnContent = isSpecialTallLayout ? [...col1, ...col2] : col1;
  const secondColumnContent = isSpecialTallLayout ? [] : col2;

  return (
    <div className={cn('w-full')}>
      {heading && (
        <div className="mb-4">
          <p>
            <span className="font-medium text-primary">{heading.brand}</span>
            <span className="ml-4 font-normal text-secondary-foreground">
              {heading.date}
            </span>
          </p>
          <p className="font-medium text-secondary-foreground">
            {heading.title}
          </p>
        </div>
      )}
      <div className="flex flex-row gap-[clamp(4rem,calc(0.0078125vw-4rem),12rem)]">
        <div className="flex-1 space-y-4">
          {firstColumnContent.map((p, i) => (
            <p key={i} className="font-normal text-primary">
              {p}
            </p>
          ))}
        </div>
        <div className="flex-1 space-y-4">
          {secondColumnContent.map((p, i) => (
            <p key={i} className="font-normal text-primary">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
