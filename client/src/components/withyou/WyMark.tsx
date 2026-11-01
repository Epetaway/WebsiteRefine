import { useId } from "react";

/**
 * The WithYou mark: two rotated ellipses, coral over blush, with the right ellipse's near half
 * redrawn on top so the rings interlock. Kept dependency-free so pages outside the case study
 * (Field Notes) can draw the mark without loading the case study's media data.
 */
export function WyMark({
  size = 48,
  coral = "var(--wy-coral)",
  blush = "var(--wy-blush)",
  title,
  className,
}: {
  size?: number;
  coral?: string;
  blush?: string;
  title?: string;
  className?: string;
}) {
  const stroke = Math.max(3, size * 0.088) * (60 / size);
  const clipId = `wy-mark-${useId().replace(/:/g, "")}`;
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.93}
      viewBox="0 0 60 56"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="30" y="0" width="30" height="56" />
        </clipPath>
      </defs>
      <g transform="rotate(10 41 28)">
        <ellipse cx="41" cy="28" rx="16" ry="22" fill="none" stroke={blush} strokeWidth={stroke} />
      </g>
      <g transform="rotate(-10 19 28)">
        <ellipse cx="19" cy="28" rx="16" ry="22" fill="none" stroke={coral} strokeWidth={stroke} />
      </g>
      <g transform="rotate(10 41 28)" clipPath={`url(#${clipId})`}>
        <ellipse cx="41" cy="28" rx="16" ry="22" fill="none" stroke={blush} strokeWidth={stroke} />
      </g>
    </svg>
  );
}
