import { useScrollProgress } from '@/shared/hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      role="progressbar"
      aria-label="Progresso de leitura"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[2px] z-indicator pointer-events-none"
    >
      <div
        className="h-full bg-primary origin-left transition-transform duration-snappy"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
