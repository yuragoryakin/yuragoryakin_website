import type { FC } from 'react';

type SkillsSectionProps = {
  isMobile: boolean;
};

const skillsData: string[][] = [
  [
    'User research\nUser flows\nWireframing\nPrototyping\nResponsive design\nDesign systems\nDesign thinking\nAccessibility\nLow/no-code tools\nGraphic design\nTypography\nBusiness Analysis\nRequirements Gathering\nEnglish fluent\nRussian native',
  ],
  [
    'Figma\nUXPin\nWebflow\nFramer\nAdobe Suite\nAI Copilots\nMaze\nProtoPie\nOrigami Live\nAtlassian suite\nSlack\nHTML/CSS\nJavaScript\nStorybook',
  ],
];

const SkillsSection: FC<SkillsSectionProps> = ({
  isMobile,
}) => {
  const content = skillsData;
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
