import type { FC } from 'react';
import { cn } from '@/lib/utils';

type SkillsSectionProps = {
  content: string[][];
  isMobile: boolean;
  isTallScreen: boolean;
};

const SkillsSection: FC<SkillsSectionProps> = ({
  content,
  isMobile,
  isTallScreen,
}) => {
  const skillsCols = content.map((col) => col.join('\n'));

  if (isMobile) {
    return (
      <div className="w-full">
        <p className="whitespace-pre-line font-normal text-primary">
          {skillsCols.join('\n\n')}
        </p>
      </div>
    );
  }

  // On desktop, always use two columns.
  const firstColumnContent = skillsCols[0];
  const secondColumnContent = skillsCols[1] || '';

  return (
    <div className="w-full">
      <div className="flex flex-row gap-[clamp(4rem,calc(0.0078125vw-4rem),12rem)]">
        <div className="flex-1">
          <p className="whitespace-pre-line font-normal text-primary">
            {firstColumnContent}
          </p>
        </div>
        <div className="flex-1">
          <p className="whitespace-pre-line font-normal text-primary">
            {secondColumnContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
