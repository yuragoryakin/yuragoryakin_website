import type { FC } from 'react';
import { cn } from '@/lib/utils';

type ContactSectionProps = {
  content: string[][];
  isMobile: boolean;
};

const ContactSection: FC<ContactSectionProps> = ({ content, isMobile }) => {
  const items = content[0];
  return (
    <>
      <div
        className={cn(
          isMobile
            ? 'w-full'
            : 'w-[clamp(624px,50vw+112px,880px)] max-w-[1210px]'
        )}
      >
        <div className="space-y-4">
          {items.map((item, i) => (
            <p key={i} className="font-normal text-primary">
              {item}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactSection;
