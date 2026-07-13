import { motion } from 'framer-motion'
import GalleryCarousel from './GalleryCarousel'
import type { GalleryData } from './galleries'
import { EASE } from '@/config/motion'

interface GalleryGroupProps {
  gallery: GalleryData
}

export default function GalleryGroup({ gallery }: GalleryGroupProps) {
  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      <motion.div
        className="max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="font-body text-primary/85 text-sm tabular-nums">{gallery.index}</span>
          <span className="rule-brand" aria-hidden="true" />
        </div>
        <h3
          className="font-display font-bold text-support leading-[1.02] text-[clamp(1.875rem,3.6vw,3.25rem)] tracking-[-0.02em]"
        >
          {gallery.title}
        </h3>
        <p className="font-body italic text-support/60 mt-5 text-base lg:text-lg leading-relaxed mx-auto max-w-md">
          {gallery.subtitle}
        </p>
      </motion.div>

      <GalleryCarousel title={gallery.title} cards={gallery.cards} />
    </div>
  )
}
