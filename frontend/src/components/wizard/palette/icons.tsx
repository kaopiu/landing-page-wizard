"use client";

import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const StarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2l2.6 6.2 6.7.5-5.1 4.4 1.6 6.6L12 16l-5.8 3.7 1.6-6.6-5.1-4.4 6.7-.5L12 2Z" />
  </svg>
);

const BagIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 8h10l-.9 11.2a2 2 0 0 1-2 1.8H9.9a2 2 0 0 1-2-1.8L7 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

const HeadphonesIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="14" width="4" height="6" rx="2" />
    <rect x="17" y="14" width="4" height="6" rx="2" />
  </svg>
);

const CameraIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 7l1.3-2h5.4L16 7" />
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <circle cx="12" cy="13.5" r="3.3" />
  </svg>
);

const HeartIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 21s-7.5-4.6-10-9.1C.6 8.7 2 5 5.6 5 8 5 9.7 6.5 12 9c2.3-2.5 4-4 6.4-4 3.6 0 5 3.7 3.6 6.9C19.5 16.4 12 21 12 21Z" />
  </svg>
);

const BoltIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

const RocketIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2c3 1.5 5 5 5 9 0 2-.5 4-1.5 5.5L12 19l-3.5 2.5C7.5 20 7 18 7 16c0-4 2-7.5 5-14Z" />
    <circle cx="12" cy="10" r="1.6" />
    <path d="M8 16l-3 3M16 16l3 3" />
  </svg>
);

export const MOCKUP_ICONS: { name: string; Icon: ComponentType<IconProps> }[] = [
  { name: "star", Icon: StarIcon },
  { name: "bag", Icon: BagIcon },
  { name: "headphones", Icon: HeadphonesIcon },
  { name: "camera", Icon: CameraIcon },
  { name: "heart", Icon: HeartIcon },
  { name: "bolt", Icon: BoltIcon },
  { name: "rocket", Icon: RocketIcon },
];

/** Deterministically picks a generic decorative icon from a seed string, so it stays stable across re-renders but varies per business. */
export function pickMockupIcon(seed: string) {
  const trimmed = seed.trim();
  if (!trimmed) return MOCKUP_ICONS[0];
  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (hash * 31 + trimmed.charCodeAt(i)) >>> 0;
  }
  return MOCKUP_ICONS[hash % MOCKUP_ICONS.length];
}
