'use client';

import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { ThemeToggle } from '../theme-toggle';

type SidebarProps = ComponentProps<'aside'> & {
  onLinkClick: (sectionId: number, closeSheet?: () => void) => void;
  isMobileView?: boolean;
  activeSection: number;
  closeSheet?: () => void;
};

export default function Sidebar({ className, onLinkClick, isMobileView = false, activeSection, closeSheet, ...props }: SidebarProps) {
  const sections = [
    { id: 1, name: 'Intro' },
    { id: 2, name: 'Experience' },
    { id: 3, name: 'Education' },
    { id: 4, name: 'Skills' },
    { id: 5, name: 'About' },
    { id: 6, name: 'Contact' },
  ];
  
  const handleLinkClick = (sectionId: number) => {
    onLinkClick(sectionId, closeSheet);
  };

  return (
    <aside
      className={cn(
        'flex flex-col pb-8',
        isMobileView
          ? 'px-5'
          : 'lg:w-fit lg:min-w-36 lg:pl-10 lg:pr-4 lg:pt-[55px] xl:pt-[96px] 2xl:pt-[162px]', // each reduced by 16px
        className
      )}
      {...props}
    >
      <nav className="flex flex-col items-start gap-4 relative">
        {/* Width anchor for the widest link at its widest font weight, only affects width */}
        <span
          className="block h-0 overflow-hidden opacity-0 pointer-events-none font-normal"
          aria-hidden="true"
          tabIndex={-1}
        >
          Experience
        </span>
        {isMobileView && (
          <>
            <a
              href="/Yura_Goryakin_CV.pdf"
              download="Yura_Goryakin_CV.pdf"
              onClick={closeSheet}
              className="rounded-md font-normal text-muted-foreground transition-all duration-200 hover:font-medium hover:text-primary"
            >
              Download CV
            </a>
            <Separator className="my-2 bg-border" />
          </>
        )}
        {sections.map((section) => {
          return (
            <a
              key={section.id}
              href={`#section-${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(section.id);
              }}
              className={cn(
                'rounded-md transition-all duration-200 cursor-pointer hover:font-medium hover:text-primary',
                activeSection === section.id
                  ? 'font-medium text-primary'
                  : 'font-normal text-muted-foreground'
              )}
            >
              {section.name}
            </a>
          );
        })}
        {activeSection === 7 && (
          <a
            href="#section-7"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(7);
            }}
            className="font-normal text-primary cursor-pointer"
          >
            Credits
          </a>
        )}
      </nav>
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </aside>
  );
}
