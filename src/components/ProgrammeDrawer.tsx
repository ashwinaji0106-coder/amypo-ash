import { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import type { Programme } from '../data/collegeData';

interface ProgrammeDrawerProps {
  programme: Programme | null;
  onClose: () => void;
  onInquire: (programmeTitle: string) => void;
}

export function ProgrammeDrawer({
  programme,
  onClose,
  onInquire,
}: ProgrammeDrawerProps) {
  useEffect(() => {
    if (!programme) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [programme, onClose]);

  if (!programme) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-zinc-950/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-programme-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#FAF9F6] h-full overflow-y-auto border-l border-zinc-200 p-6 sm:p-10 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-zinc-200">
            <div>
              <p className="text-xs font-medium text-zinc-500">
                {programme.schoolLabel}
                <span aria-hidden="true" className="mx-2">·</span>
                {programme.level}
              </p>
              <h2
                id="drawer-programme-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-zinc-950 mt-2 text-balance"
              >
                {programme.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close programme details"
              className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700 hover:text-zinc-950 hover:border-zinc-300 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B365D]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-6 text-base text-zinc-700 leading-relaxed">
            {programme.summary}
          </p>

          {/* Key Academic Metadata */}
          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 py-5 border-y border-zinc-200">
            <div>
              <dt className="text-xs text-zinc-500">Duration</dt>
              <dd className="mt-1 text-sm font-semibold text-zinc-900 tabular-nums">
                {programme.duration}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Annual Intake</dt>
              <dd className="mt-1 font-mono text-sm font-medium text-zinc-900 tabular-nums">
                {programme.intake} Seats
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Degree Track</dt>
              <dd className="mt-1 text-sm font-semibold text-zinc-900">
                Autonomous CBCS
              </dd>
            </div>
          </dl>

          {/* Eligibility */}
          <div className="mt-7">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
              Eligibility Criteria
            </h3>
            <p className="mt-2 text-sm text-zinc-800 leading-relaxed">
              {programme.eligibility}
            </p>
          </div>

          {/* Core Modules */}
          <div className="mt-7">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
              Core Academic Modules
            </h3>
            <ul className="mt-3 space-y-2.5 border-t border-zinc-200 pt-3">
              {programme.coreModules.map((mod, idx) => (
                <li
                  key={mod}
                  className="flex items-baseline gap-3 text-sm text-zinc-800"
                >
                  <span className="font-mono text-xs text-zinc-400 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{mod}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Industry Certifications */}
          <div className="mt-7">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
              Embedded Value-Added Certifications
            </h3>
            <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
              {programme.certifications.join(' · ')}
            </p>
          </div>

          {/* Career Pathways */}
          <div className="mt-7 pb-6">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
              Graduate Career Pathways
            </h3>
            <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
              {programme.careerPathways.join(' · ')}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#FAF9F6]">
          <span className="text-xs text-zinc-500">
            Admissions 2026–27 Open · Bharathiar University Affiliated
          </span>
          <button
            type="button"
            onClick={() => onInquire(programme.title)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1B365D] hover:bg-[#142847] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1B365D]"
          >
            <span>Inquire for This Programme</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
