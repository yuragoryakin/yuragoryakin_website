import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { SectionData } from '@/types';

type ExperienceSectionProps = {
  isMobile: boolean;
  isTallScreen: boolean;
};

const experienceData: Pick<SectionData, 'heading' | 'content'> = {
  heading: {
    brand: 'Dodo Brands',
    date: 'April 2023 – March 2025',
    title: 'Product Designer (Previously UX/UI)',
  },
  content: [
    [
      'Designed and launched the UX/UI for a highly complex internal software across web and mobile, emphasizing usability, accessibility, and visual coherence for 1,000+ users.',
      'Led product research initiatives, utilizing competitive analysis, user interviews, surveys, heuristic evaluations, and user journey testing to identify critical user pain points and deliver user-backed insights to UX.',
      'Built and maintained a design system in Figma, leveraging Auto Layout, Dev Mode, and component libraries with HTML/CSS previews to streamline engineer hand-off.',
      'Established essential UX architecture for data-heavy interactions, including role-based permissions and entity relationships.',
    ],
    [
      'Translated complex business logic into functional design specifications through close partnership with developers and stakeholders.',
      'Expanded responsibilities beyond core design by leading competitor analysis, feature prioritization, stakeholder workshops, and requirements gathering, synchronizing business objectives with technical execution.',
      'Contributed to product strategy and feature prioritization, directly influencing the development roadmap and optimizing resource allocation within a lean team setting.',
      'Revamped operational workflows, resulting in significant improvements in company-wide efficiency.',
    ],
  ],
};

const ExperienceSection: FC<ExperienceSectionProps> = ({
  isMobile,
  isTallScreen,
}) => {
  const { heading, content } = experienceData;
  const [col1, col2] = content as string[][];
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
