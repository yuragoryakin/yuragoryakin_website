"use client";

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false); // Initial render is always `false`

  useEffect(() => {
    // Effect runs only on client, after initial render
    const mediaQueryList = window.matchMedia(query);
    
    // Update state with the correct value after mounting
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    mediaQueryList.addEventListener("change", listener);
    
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
