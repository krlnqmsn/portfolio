/**
 * The stacked KRLN wordmark. Drawn with currentColor so it turns
 * black on the light theme and white on the dark one by itself.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`display inline-flex select-none flex-col uppercase leading-[0.74] tracking-[-0.09em] ${className}`}
    >
      <span>KR</span>
      <span>LN</span>
    </span>
  );
}
