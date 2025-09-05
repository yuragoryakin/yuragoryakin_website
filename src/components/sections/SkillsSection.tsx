import type { FC } from 'react';
import { cn } from '@/lib/utils';

type SkillsSectionProps = {
  isMobile: boolean;
};

const skillsData = {
  skills: [
    'User research',
    'User flows',
    'Wireframing',
    'Prototyping',
    'Responsive design',
    'Design systems',
    'Design thinking',
    'Accessibility',
    'Low/no-code tools',
    'Graphic design',
    'Typography',
    'Business Analysis',
    'Requirements Gathering',
    'English fluent',
    'Russian native'
  ],
  tools: [
    'Figma',
    'AI Coding',
    'UXPin',
    'Webflow',
    'Framer',
    'Adobe Suite',
    'AI Copilots',
    'Maze',
    'ProtoPie',
    'Origami Live',
    'Atlassian suite',
    'Slack',
    'HTML/CSS',
    'JavaScript',
    'Storybook'
  ]
};

const SkillsSection: FC<SkillsSectionProps> = ({
  isMobile,
}) => {
  const { skills, tools } = skillsData;
  
  if (isMobile) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-8">
          <div>
            <div className="space-y-2">
              {skills.map((skill, i) => (
                <p key={i} className="font-normal text-primary text-[20px]">
                  {skill}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[28px] font-bold mb-2">Tools</h3>
            <div className="space-y-2">
              {tools.map((tool, i) => (
                <p key={i} className="font-normal text-primary text-[20px]">
                  {tool}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // On desktop, always use two columns.
  return (
    <div className="w-full">
      <div className="flex flex-row gap-[clamp(4rem,calc(0.0078125vw-4rem),12rem)]">
        <div className="flex-1">
          <div className="space-y-2">
            {skills.map((skill, i) => (
              <p key={i} className="font-normal text-primary">
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-heading font-bold mb-2">Tools</h3>
          <div className="space-y-2">
            {tools.map((tool, i) => (
              <p key={i} className="font-normal text-primary">
                {tool}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
