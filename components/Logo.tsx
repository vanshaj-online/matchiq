import React from 'react';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export default function Logo({
  className = '',
  iconClassName = 'h-5 w-5',
  textClassName = '',
  showText = true,
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={`${iconClassName} shrink-0`}
        role="img"
        aria-label="MatchIQ Logo"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>MatchIQ Logo</title>
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(31, 30, 29, 0.3)"
          strokeWidth="5"
        />
        <path
          d="M50 10 A40 40 0 1 1 10.72 65"
          fill="none"
          stroke="#c2410c"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="33"
          y1="50"
          x2="43"
          y2="62"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="43"
          y1="62"
          x2="67"
          y2="36"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <span className={`font-display font-bold tracking-tight text-paper-ink text-[17px] leading-none ${textClassName}`}>
          MatchIQ
        </span>
      )}
    </div>
  );
}
