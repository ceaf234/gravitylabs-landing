import { Construction } from 'lucide-react';

function ConstructionBanner() {
  return (
    <div
      role="status"
      className="fixed left-0 right-0 top-0 z-[60] flex items-center justify-center gap-2 bg-accent-gold px-4 py-1.5 text-center text-xs font-medium text-[#1a1a1a] sm:text-sm"
    >
      <Construction className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
      <span>Sitio en construcción — Pronto tendremos cosas increíbles para ti.</span>
    </div>
  );
}

export { ConstructionBanner };
