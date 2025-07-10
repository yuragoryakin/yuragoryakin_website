"use client"

import type { ComponentProps } from 'react';
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetPortal,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Sidebar from './sidebar';
import { AnimatePresence } from 'framer-motion';
import AnimatedHamburgerIcon from '../icons/animated-hamburger';

type HeaderProps = ComponentProps<'header'> & {
  activeSection?: number;
  onLinkClick?: (sectionId: number, closeSheet?: () => void) => void;
  sections: { id: number; name: string }[];
};

export default function Header({
  className,
  activeSection = 1,
  onLinkClick = () => {},
  sections,
  ...props
}: HeaderProps) {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  const closeSheet = () => setSheetOpen(false);

  return (
    <header
      className={cn('sticky top-0 z-10 h-16 bg-background', className)}
      {...props}
    >
      <div className="flex h-full items-center justify-between px-5 lg:px-10">
        <div className="flex items-center gap-2">
          <a
            href="#section-1"
            onClick={(e) => {
              e.preventDefault();
              onLinkClick(1);
            }}
            className="text-heading font-normal whitespace-nowrap"
          >
            Yura Goryakin
          </a>
        </div>
        <div className="flex items-center justify-end gap-4">
          <a
            href="/Yura_Goryakin_CV.pdf"
            download="Yura_Goryakin_CV.pdf"
            className="hidden items-center rounded-md font-normal text-muted-foreground transition-all duration-200 hover:font-medium hover:text-primary lg:flex"
          >
            Download CV
          </a>
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    isSheetOpen &&
                      'hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                  )}
                >
                  <AnimatedHamburgerIcon
                    isOpen={isSheetOpen}
                    className="h-6 w-6"
                  />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <AnimatePresence>
                {isSheetOpen && (
                  <SheetPortal forceMount>
                    <SheetContent
                      forceMount
                      side="top"
                      className="w-full px-5 py-6 h-[calc(100vh-4rem)]"
                    >
                      <SheetHeader>
                        <SheetTitle className="sr-only">
                          Navigation Menu
                        </SheetTitle>
                      </SheetHeader>
                      <Sidebar
                        onLinkClick={onLinkClick}
                        activeSection={activeSection}
                        closeSheet={closeSheet}
                        isMobileView={true}
                        className="h-full border-r-0"
                        sections={sections}
                      />
                    </SheetContent>
                  </SheetPortal>
                )}
              </AnimatePresence>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
