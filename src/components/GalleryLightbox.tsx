import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { GalleryPlate } from '../data/collegeData';
import { SafeImage } from './SafeImage';

interface GalleryLightboxProps {
  plates: GalleryPlate[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function GalleryLightbox({
  plates,
  activeIndex,
  onClose,
  onSelectIndex,
}: GalleryLightboxProps) {
  const isOpen = activeIndex !== null && plates[activeIndex] !== undefined;
  const activePlate = isOpen ? plates[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % plates.length);
      }
      if (e.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + plates.length) % plates.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, activeIndex, plates.length, onClose, onSelectIndex]);

  return (
    <AnimatePresence>
      {isOpen && activePlate && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label={activePlate.title}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#161B26] border border-zinc-800 rounded-lg overflow-hidden text-zinc-100"
          >
            {/* Top Bar inside Lightbox */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-800">
              <div className="text-xs text-zinc-400 font-medium">
                <span className="font-mono text-zinc-300 tabular-nums">
                  {activePlate.plateNumber}
                </span>
                <span aria-hidden="true" className="mx-2">·</span>
                <span>{activePlate.category}</span>
                <span aria-hidden="true" className="mx-2">·</span>
                <span>{activePlate.yearOrContext}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close photograph viewer"
                className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Viewport */}
            <div className="relative bg-zinc-950 aspect-[16/10] w-full overflow-hidden">
              <SafeImage
                src={activePlate.image}
                alt={activePlate.alt}
                className="w-full h-full object-cover"
                fallbackLabel={activePlate.title}
              />

              <button
                type="button"
                onClick={() =>
                  onSelectIndex((activeIndex - 1 + plates.length) % plates.length)
                }
                aria-label="Previous photograph"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center rounded-md bg-zinc-950/75 border border-zinc-700 text-white hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onSelectIndex((activeIndex + 1) % plates.length)}
                aria-label="Next photograph"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center rounded-md bg-zinc-950/75 border border-zinc-700 text-white hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption Footer */}
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {activePlate.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                  {activePlate.description}
                </p>
              </div>
              <span className="font-mono text-xs text-zinc-400 tabular-nums shrink-0">
                {activeIndex + 1} / {plates.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
