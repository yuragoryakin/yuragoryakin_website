'use client';

import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';

type SidebarProps = ComponentProps<'aside'> & {
  onLinkClick: (sectionId: number, closeSheet?: () => void) => void;
  isMobileView?: boolean;
  activeSection: number;
  closeSheet?: () => void;
  sections: { id: number; name: string }[];
};

export default function Sidebar({
  className,
  onLinkClick,
  isMobileView = false,
  activeSection,
  closeSheet,
  sections,
  ...props
}: SidebarProps) {
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
      {isMobileView ? (
        <>
          <div>
            <a
              href="/Yura_Goryakin_CV.pdf"
              download="Yura_Goryakin_CV.pdf"
              onClick={closeSheet}
              className="rounded-md font-normal text-muted-foreground transition-all duration-200 hover:font-medium hover:text-primary"
            >
              Download CV
            </a>
          </div>

          <nav className="flex-grow flex flex-col justify-center items-start gap-4 relative">
            {sections.map((section) => (
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
            ))}
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

          <div className="mb-4">
            <ThemeToggle />
          </div>
        </>
      ) : (
        <>
          <nav className="flex flex-col items-start gap-4 relative">
            <span
              className="block h-0 overflow-hidden opacity-0 pointer-events-none font-normal"
              aria-hidden="true"
              tabIndex={-1}
            >
              Experience
            </span>
            {sections.map((section) => (
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
            ))}
            <AnimatePresence>
              {activeSection === 7 && (
                <motion.a
                  href="#section-7"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(7);
                  }}
                  className="font-normal text-primary cursor-pointer"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  Credits
                </motion.a>
              )}
            </AnimatePresence>
          </nav>
          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </>
      )}
    </aside>
  );
}
