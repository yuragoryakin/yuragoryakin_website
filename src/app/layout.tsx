import type { Metadata } from 'next';
import { Rethink_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rethink-sans',
});

export const metadata: Metadata = {
  title: 'Yura Goryakin',
  description:
    'A page with scroll-snapping sections, a fixed header, and a static sidebar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={cn(
          'font-body antialiased text-[clamp(0.875rem,0.8181rem+0.2845vw,1rem)] lg:text-base 2xl:text-lg leading-[1.6]',
          rethinkSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
