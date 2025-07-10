import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type FooterProps = {
  isMobile?: boolean;
};

const Footer = ({ isMobile }: FooterProps) => {
  return (
    <footer
      className={cn(
        'text-muted-foreground flex flex-col items-start',
        !isMobile && 'absolute bottom-8'
      )}
    >
      <div className="relative w-64 aspect-[2599/2497] mb-4">
        <Image
          src="/yura_illustration.png"
          alt="Illustration of Yura"
          fill
          className="rounded-lg object-contain"
          data-ai-hint="Illustration of Yura"
        />
      </div>
      <div>
        <p>
          Designed and developed by{' '}
          <a
            href="https://yuragoryakin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            me
          </a>
        </p>
        <p>Illustrated by my wife Julia Plyasunova</p>
        <p>&copy; 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
