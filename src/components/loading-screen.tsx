'use client';

import React, { useEffect, useState } from 'react';

const IMG_SRC = '/yura_illustration.png';
const IMG_WIDTH = 2599; // original PNG width
const IMG_HEIGHT = 2497; // original PNG height
const BLOCK_COUNT = 20;

// Helper to generate a random blob path centered at (cx, cy) with average radius r and some randomness
function generateBlobPath(cx: number, cy: number, r: number, points: number = 8, variance: number = 0.35) {
  const angleStep = (Math.PI * 2) / points;
  let d = '';
  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    const rand = 1 + (Math.random() - 0.5) * variance;
    const x = cx + Math.cos(angle) * r * rand;
    const y = cy + Math.sin(angle) * r * rand;
    if (i === 0) {
      d = `M${x},${y}`;
    } else {
      d += ` Q${cx + Math.cos(angle - angleStep / 2) * r},${cy + Math.sin(angle - angleStep / 2) * r} ${x},${y}`;
    }
  }
  d += ' Z';
  return d;
}

function generateRandomBlobs() {
  // 20 blobs, distributed in a loose grid but with random centers and radii
  const blobs = [];
  const cols = 5;
  const rows = 4;
  const cellW = IMG_WIDTH / cols;
  const cellH = IMG_HEIGHT / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Center in cell, with random offset
      const cx = c * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.4;
      const cy = r * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.4;
      // Radius covers most of cell, with overlap
      const radius = Math.min(cellW, cellH) * (0.7 + Math.random() * 0.3);
      blobs.push({ d: generateBlobPath(cx, cy, radius, 8 + Math.floor(Math.random() * 4), 0.5) });
    }
  }
  // Shuffle for reveal order
  for (let i = blobs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [blobs[i], blobs[j]] = [blobs[j], blobs[i]];
  }
  return blobs;
}

export default function LoadingScreen({ onAnimationComplete, onFadeOutStart }: { onAnimationComplete?: () => void, onFadeOutStart?: () => void }) {
  const [blobs, setBlobs] = useState<null | { d: string }[]>(null);
  const [remainingCount, setRemainingCount] = useState(BLOCK_COUNT);
  const [fadeOut, setFadeOut] = useState(false);

  // Generate blobs only on the client
  useEffect(() => {
    setBlobs(generateRandomBlobs());
  }, []);

  // Animation effect
  useEffect(() => {
    if (blobs && remainingCount > 0) {
      const timeout = setTimeout(() => setRemainingCount(remainingCount - 1), 120);
      return () => clearTimeout(timeout);
    } else if (blobs && remainingCount === 0) {
      if (onFadeOutStart) onFadeOutStart();
      setFadeOut(true);
    }
  }, [remainingCount, blobs, onFadeOutStart]);

  // Call onAnimationComplete after fade out
  useEffect(() => {
    if (fadeOut) {
      const timeout = setTimeout(() => {
        if (onAnimationComplete) onAnimationComplete();
      }, 700); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [fadeOut, onAnimationComplete]);

  const containerStyle = {
    width: 'clamp(180px, 60vw, 300px)',
    aspectRatio: `${IMG_WIDTH} / ${IMG_HEIGHT}`,
    position: 'relative'
  };

  // While blobs are not generated, show a white screen
  if (!blobs) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div style={{ ...containerStyle, background: 'white' } as React.CSSProperties} />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.7s',
        pointerEvents: fadeOut ? 'none' : undefined,
      }}
    >
      <div style={containerStyle}>
        <img
          src={IMG_SRC}
          alt="Loading illustration"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'contain',
            userSelect: 'none',
            pointerEvents: 'none',
            position: 'relative',
            zIndex: 1,
          }}
        />
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
          }}
          viewBox={`0 0 ${IMG_WIDTH} ${IMG_HEIGHT}`}
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
        >
          {blobs.slice(0, remainingCount).map((blob, i) => (
            <path
              key={i}
              d={blob.d}
              fill="white"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}