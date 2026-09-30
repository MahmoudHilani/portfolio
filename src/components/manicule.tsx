// Public-domain typographic engraving; source and adaptation notes are in the SVG.
export function Manicule({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="140 220 3860 2150"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <use href="/manicule.svg#manicule" />
    </svg>
  );
}
