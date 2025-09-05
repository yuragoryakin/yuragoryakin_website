import type { FC } from 'react';
import { cn } from '@/lib/utils';
import type { SectionData } from '@/types';

type ExperienceSectionProps = {
  isMobile: boolean;
  isTallScreen: boolean;
};

const experienceData: Pick<SectionData, 'heading' | 'content'> = {
  heading: {
    brand: 'B2B SaaS for Dodo Brands',
    date: 'April 2023 – March 2025',
    title: 'Product Designer',
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
            <p className="font-medium text-secondary-foreground text-[20px]">
              {heading.title}
            </p>
            <p className="text-[20px]">
              <span className="font-normal text-secondary-foreground">
                {heading.date}
              </span>
              <span className="ml-4 font-medium text-primary">{heading.brand}</span>
            </p>
          </div>
        )}
        {/* Screenshots row - mobile version (2 rows, 1 column) */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="w-full">
            <img 
              src="/2025-09-05 15.16.15.jpg" 
              alt="Experience screenshot 1" 
              className="w-full rounded-lg"
            />
          </div>
          <div className="w-full">
            <img 
              src="/2025-09-05 15.16.36.jpg" 
              alt="Experience screenshot 2" 
              className="w-full rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-4">
          {[...col1, ...col2].map((p, i) => (
            <p key={i} className="font-normal text-primary text-[20px]">
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
          <p className="font-medium text-secondary-foreground">
            {heading.title}
          </p>
          <p>
            <span className="font-normal text-secondary-foreground">
              {heading.date}
            </span>
            <span className="ml-4 font-medium text-primary">{heading.brand}</span>
          </p>
        </div>
      )}
      {/* Screenshots row - desktop version (1 row, 2 columns) */}
      <div className="flex flex-row gap-4 mb-6">
        <div className="flex-1">
          <img 
            src="/2025-09-05 15.16.15.jpg" 
            alt="Experience screenshot 1" 
            className="w-full rounded-lg"
          />
        </div>
        <div className="flex-1">
          <img 
            src="/2025-09-05 15.16.36.jpg" 
            alt="Experience screenshot 2" 
            className="w-full rounded-lg"
          />
        </div>
      </div>
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
