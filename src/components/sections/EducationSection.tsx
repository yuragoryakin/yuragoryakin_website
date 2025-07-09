import type { FC } from 'react';
import { cn } from '@/lib/utils';

type EducationItem = {
  institute: string;
  degree: string;
};

type EducationSectionProps = {
  content: EducationItem[];
  isMobile: boolean;
  isTallScreen: boolean;
};

const EducationSection: FC<EducationSectionProps> = ({
  content,
  isMobile,
  isTallScreen,
}) => {
  const isSpecialTallLayout = isTallScreen && !isMobile;

  if (isMobile) {
    return (
      <div className="w-full">
        <div className="space-y-8">
          {content.map((item, i) => (
            <div key={i}>
              <p className="font-normal text-primary">{item.institute}</p>
              <p className="font-normal text-secondary-foreground">
                {item.degree}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Split content for two-column layout
  const halfwayIndex = Math.ceil(content.length / 2);
  const col1 = content.slice(0, halfwayIndex);
  const col2 = content.slice(halfwayIndex);

  const firstColumnContent = isSpecialTallLayout ? content : col1;
  const secondColumnContent = isSpecialTallLayout ? [] : col2;

  return (
    <div className="w-full">
      <div className="flex flex-row gap-[clamp(4rem,calc(0.0078125vw-4rem),12rem)]">
        <div className="flex-1 space-y-8">
          {firstColumnContent.map((item, i) => (
            <div key={i}>
              <p className="font-normal text-primary">{item.institute}</p>
              <p className="font-normal text-secondary-foreground">
                {item.degree}
              </p>
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-8">
          {secondColumnContent.map((item, i) => (
            <div key={i}>
              <p className="font-normal text-primary">{item.institute}</p>
              <p className="font-normal text-secondary-foreground">
                {item.degree}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
