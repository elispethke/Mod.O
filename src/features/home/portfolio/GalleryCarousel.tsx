import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { GalleryCardData } from './galleries'
import { EASE } from '@/config/motion'

const VISIBLE_RANGE = 2

interface GalleryCarouselProps {
  title: string
  cards: GalleryCardData[]
}

export default function GalleryCarousel({ title, cards }: GalleryCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const count      = cards.length
  const cardWidth  = width ? Math.min(380, Math.max(180, width * 0.4)) : 260
  const spacing    = cardWidth * 0.72

  const goTo = useCallback((i: number) => {
    setActiveIndex(((i % count) + count) % count)
  }, [count])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) goTo(activeIndex + 1)
    else if (info.offset.x > 60) goTo(activeIndex - 1)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') goTo(activeIndex + 1)
    if (e.key === 'ArrowLeft') goTo(activeIndex - 1)
  }

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Texto de fundo gigante — assinatura editorial da marca */}
      <span
        className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-display font-bold text-[13vw] lg:text-[7vw] leading-none text-support/[0.05] whitespace-nowrap select-none pointer-events-none"
        aria-hidden="true"
      >
        {title}
      </span>

      <div
        ref={containerRef}
        className="relative h-[320px] sm:h-[400px] lg:h-[480px] flex items-center justify-center overflow-hidden sm:overflow-visible [perspective:1600px]"
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
        >
          {cards.map((card, i) => {
            let offset = i - activeIndex
            if (offset > count / 2) offset -= count
            if (offset < -count / 2) offset += count

            const isActive = offset === 0
            const abs       = Math.abs(offset)
            const isHidden  = abs > VISIBLE_RANGE

            return (
              <motion.button
                key={card.src}
                type="button"
                aria-label={card.alt}
                aria-current={isActive}
                tabIndex={isHidden ? -1 : 0}
                onClick={() => !isActive && goTo(i)}
                className="absolute top-1/2 left-1/2 rounded-[3px]"
                style={{ width: cardWidth, aspectRatio: '3 / 4', zIndex: 10 - abs }}
                initial={false}
                animate={{
                  x: `calc(-50% + ${offset * spacing}px)`,
                  y: '-50%',
                  scale:   isActive ? 1 : 1 - abs * 0.14,
                  opacity: isHidden ? 0 : 1 - abs * 0.28,
                  rotateY: offset * -12,
                  filter:  isActive ? 'blur(0px)' : `blur(${abs * 1.5}px)`,
                }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div
                  className={cn(
                    'relative w-full h-full overflow-hidden border transition-colors duration-slow',
                    isActive ? 'border-primary/50 shadow-red-lg' : 'border-white/25 shadow-2xl',
                  )}
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                  <div
                    className={cn(
                      'absolute inset-0 transition-opacity duration-slow',
                      isActive ? 'bg-gradient-to-t from-support/35 via-transparent to-transparent opacity-100' : 'bg-support/25 opacity-100',
                    )}
                    aria-hidden="true"
                  />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 ring-1 ring-inset ring-primary/40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        <button
          type="button"
          aria-label="Imagem anterior"
          onClick={() => goTo(activeIndex - 1)}
          className="hidden sm:flex absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-14 lg:h-14 items-center justify-center rounded-full border border-support/20 bg-base/70 backdrop-blur-sm transition-all duration-base hover:border-primary hover:bg-primary hover:text-white"
        >
          <svg width="16" height="12" viewBox="0 0 14 10" fill="none" className="rotate-180" aria-hidden="true">
            <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Próxima imagem"
          onClick={() => goTo(activeIndex + 1)}
          className="hidden sm:flex absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-14 lg:h-14 items-center justify-center rounded-full border border-support/20 bg-base/70 backdrop-blur-sm transition-all duration-base hover:border-primary hover:bg-primary hover:text-white"
        >
          <svg width="16" height="12" viewBox="0 0 14 10" fill="none" aria-hidden="true">
            <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Legenda + navegação mobile */}
      <div className="mt-10 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Imagem anterior"
          onClick={() => goTo(activeIndex - 1)}
          className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full border border-support/20 transition-colors duration-base hover:border-primary hover:text-primary"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="rotate-180" aria-hidden="true">
            <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-baseline gap-4 min-w-[9rem] sm:min-w-[14rem] justify-center">
          <span className="font-body text-xs text-support/60 tabular-nums shrink-0">
            {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="font-body text-sm font-medium text-support tracking-[0.06em] uppercase"
            >
              {cards[activeIndex].caption}
            </motion.span>
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="Próxima imagem"
          onClick={() => goTo(activeIndex + 1)}
          className="sm:hidden w-9 h-9 flex items-center justify-center rounded-full border border-support/20 transition-colors duration-base hover:border-primary hover:text-primary"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
            <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
