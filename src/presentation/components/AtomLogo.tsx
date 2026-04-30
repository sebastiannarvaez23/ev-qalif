import { THEME } from "@infrastructure/config/theme";

interface Props {
  size?: number;
}

export function AtomLogo({ size = 56 }: Props) {
  return (
    <div className="atom-logo" aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="-11.5 -10.232 23 20.464"
        xmlns="http://www.w3.org/2000/svg"
        className="atom-logo__svg"
      >
        <circle cx="0" cy="0" r="2.05" fill={THEME.primary} />
        <g
          stroke={THEME.primary}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        >
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    </div>
  );
}
