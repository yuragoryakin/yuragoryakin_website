import type { FC } from 'react';
import { cn } from '@/lib/utils';

type ContactSectionProps = {
  isMobile: boolean;
};

const contactData: string[][] = [
  ['yuragoryakin.com', 'yu.goryakin@gmail.com', '+995557317256'],
];

const ContactSection: FC<ContactSectionProps> = ({ isMobile }) => {
  const content = contactData;
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
