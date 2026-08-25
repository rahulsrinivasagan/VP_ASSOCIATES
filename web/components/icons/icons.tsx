/* ─── Shared SVG Icons ─────────────────────────────────────────────────────── */

export const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M3 13L13 3M13 3H6M13 3V10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDown = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path
      d="M4.5 6.75L9 11.25L13.5 6.75"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronLeft = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path
      d="M11.25 13.5L6.75 9L11.25 4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRight = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path
      d="M6.75 4.5L11.25 9L6.75 13.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DiscoverIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M11 7v4l2.5 2.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const ResearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M14.5 14.5L19 19"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const DesignIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <rect x="12" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <rect x="3" y="12" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="15.5" cy="15.5" r="3.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const LaunchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M11 3L11 13M11 3L8 6M11 3L14 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 11C5 11 3 12.5 3 15C3 17.5 5 19 11 19C17 19 19 17.5 19 15C19 12.5 17 11 17 11"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const X = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
