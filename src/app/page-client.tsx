'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { cn } from '@/lib/utils';
import React from 'react';

import IntroSection from '@/components/sections/IntroSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import SkillsSection from '@/components/sections/SkillsSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { useMediaQuery } from '@/hooks/use-media-query';
import Footer from '@/components/layout/footer';
import LoadingScreen from '@/components/loading-screen';
import type { SectionData } from '@/types';

const FooterSection: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  return <Footer isMobile={isMobile} />;
};

const sections: Omit<SectionData, 'content' | 'images' | 'heading' | 'type'>[] =
  [
    {
      id: 1,
      name: 'Intro',
    },
    {
      id: 2,
      name: 'Experience',
    },
    {
      id: 3,
      name: 'Education',
    },
    {
      id: 4,
      name: 'Skills',
    },
    {
      id: 5,
      name: 'About',
    },
    {
      id: 6,
      name: 'Contact',
    },
    {
      id: 7,
      name: 'Credits',
    },
  ];

const SectionComponents: { [key: number]: React.FC<any> } = {
  1: IntroSection,
  2: ExperienceSection,
  3: EducationSection,
  4: SkillsSection,
  5: AboutSection,
  6: ContactSection,
  7: FooterSection,
};

export default function PageClient() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const mainRef = useRef<HTMLElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(1);
  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const isTallScreen = useMediaQuery('(min-height: 1020px)');
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [fadeInContent, setFadeInContent] = useState(false); // NEW
  const isDesktopInitialized = useRef(false);
  const wheelListenerRef = useRef<((e: WheelEvent) => void) | null>(null);

  const goToSection = useCallback(
    (index: number, options: { force?: boolean; duration?: number } = {}) => {
      const { force = false, duration = 0.8 } = options;

      if (isAnimatingRef.current && !force) return;
      if (index < 0 || index >= sections.length) return;
      if (!sectionRefs.current[index]) return;

      if (duration > 0) {
        isAnimatingRef.current = true;
      }

      const startIndex = currentIndexRef.current;
      currentIndexRef.current = index;

      // Main scroll animation
      gsap.to(window, {
        scrollTo: { y: sectionRefs.current[index], autoKill: false },
        duration: duration,
        ease: 'power2.inOut',
        onComplete: () => {
          if (duration > 0) {
            isAnimatingRef.current = false;
          }
          // Ensure the final section is active
          setActiveSection(sections[index].id);
        },
        overwrite: true,
      });

      // Sidebar animation logic for long jumps
      const distance = Math.abs(index - startIndex);
      if (distance > 1 && duration > 0) {
        const progress = { value: startIndex };
        gsap.to(progress, {
          value: index,
          duration: duration,
          ease: 'power2.inOut',
          onUpdate: () => {
            const intermediateIndex = Math.round(progress.value);
            if (sections[intermediateIndex]) {
              setActiveSection(sections[intermediateIndex].id);
            }
          },
        });
      } else {
        // For short jumps (or no animation), set active section immediately
        setActiveSection(sections[index].id);
      }
    },
    []
  );

  const handleLinkClick = (sectionId: number, closeSheet?: () => void) => {
    const targetIndex = sections.findIndex((sec) => sec.id === sectionId);
    if (targetIndex !== -1) {
      if (isMobile) {
        const targetElement = document.getElementById(
          sections[targetIndex].name.toLowerCase()
        );
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        goToSection(targetIndex, { force: true, duration: 0.8 });
      }
    }
    if (closeSheet) {
      closeSheet();
    }
  };

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false); // Page can now start its initialization
    setTimeout(() => {
      setShowLoader(false);
    }, 1500); // Duration of the outro animation
  }, []);

  // Trigger fade-in 400ms after loading screen starts fading out
  const handleLoaderFadeOutStart = useCallback(() => {
    const timer = setTimeout(() => {
      setFadeInContent(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading || isMobile || isDesktopInitialized.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const init = () => {
      isDesktopInitialized.current = true;
      document.body.style.overflow = 'hidden';

      gsap.to(window, { scrollTo: 0, duration: 0 });
      ScrollTrigger.refresh(true);

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive && !isAnimatingRef.current) {
              setActiveSection(sections[index].id);
            }
          },
        });
      });

      let lastTime = 0;
      const throttle = 800;

      wheelListenerRef.current = (e: WheelEvent) => {
        e.preventDefault();
        const time = new Date().getTime();
        if (time - lastTime < throttle) return;
        lastTime = time;
        const direction = e.deltaY < 0 ? -1 : 1;
        goToSection(currentIndexRef.current + direction, { duration: 0.8 });
      };

      window.addEventListener('wheel', wheelListenerRef.current, {
        passive: false,
      });

      goToSection(0, { force: true, duration: 0 });

      // After setup is complete, fade in the content.
    };

    // Defer initialization until after the browser's first paint.
    const rafId = requestAnimationFrame(() => {
      if (document.readyState === 'complete') {
        init();
      } else {
        window.addEventListener('load', init, { once: true });
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (wheelListenerRef.current) {
        window.removeEventListener('wheel', wheelListenerRef.current);
        wheelListenerRef.current = null;
      }
      ScrollTrigger.getAll().forEach((st) => st.kill(true));
      if (document.body) document.body.style.overflow = 'auto';
      isDesktopInitialized.current = false;
    };
  }, [isLoading, isMobile, goToSection]);

  return (
    <>
      {showLoader && (
        <LoadingScreen
          onAnimationComplete={handleLoadingComplete}
          onFadeOutStart={handleLoaderFadeOutStart}
        />
      )}
      <div
        ref={pageContentRef}
        className={cn(
          'h-full transition-opacity',
          fadeInContent ? 'opacity-100' : 'opacity-0'
        )}
        style={{ transitionDuration: '2400ms' }}
      >
        <Header
          onLinkClick={handleLinkClick}
          activeSection={activeSection}
          sections={sections}
        />
        <div className="flex">
          <Sidebar
            className="sticky top-16 hidden min-w-40 h-[calc(100vh-4rem)] flex-shrink-0 lg:flex pr-4"
            activeSection={activeSection}
            onLinkClick={handleLinkClick}
            sections={sections.filter((s) => s.id !== 7)}
          />
          <main
            ref={mainRef}
            className={cn(
              'relative w-full flex-1 px-5 lg:px-0 lg:pl-[clamp(120px,calc(0.1953125vw-60px),200px)] lg:pr-[clamp(140px,calc(0.234375vw-100px),280px)] 2xl:pl-[clamp(200px,calc(0.15625vw+20px),400px)] 2xl:pr-[clamp(260px,calc(0.13671875vw+50px),400px)]'
            )}
          >
            {sections.map((section, index) => {
              const { id, name } = section;
              const SectionComponent = SectionComponents[id];

              return (
                <section
                  key={id}
                  id={name.toLowerCase()}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className={cn(
                    'w-full scroll-mt-16 flex flex-col',
                    isMobile
                      ? id === 1
                        ? 'h-[calc(100vh-4rem)]'
                        : 'h-auto py-16'
                      : [
                          'min-h-[calc(100vh-4rem)]',
                          id === 1
                            ? 'lg:pt-[109px] xl:pt-[144px] 2xl:pt-[198px]'
                            : 'lg:pt-[135px] xl:pt-[176px] 2xl:pt-[242px]',
                        ]
                  )}
                >
                  {isMobile && id !== 1 && name !== 'Credits' && (
                    <h2 className="text-heading font-bold mb-8 lg:hidden">
                      {name}
                    </h2>
                  )}
                  <div
                    className={cn(
                      'flex-grow relative',
                      isMobile && id === 1 && 'flex items-center'
                    )}
                  >
                    {SectionComponent && (
                      <SectionComponent
                        isMobile={isMobile}
                        isTallScreen={isTallScreen}
                      />
                    )}
                  </div>
                </section>
              );
            })}
          </main>
        </div>
      </div>
    </>
  );
} 