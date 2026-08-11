import ImageReveal from '@/shared/components/ImageReveal'
import campanha01 from '@/assets/campanha/campanha-01.webp'

export default function Campanha() {
  return (
    <section className="relative bg-base overflow-hidden py-16 lg:py-24" aria-label="Campanha mod.o">
      <div className="container-brand">
        <ImageReveal
          src={campanha01}
          alt="Campanha mod.o Fashion Studio"
          className="w-full aspect-[16/9] lg:aspect-[2/1] rounded-2xl shadow-xl"
          direction="up"
        />
      </div>
    </section>
  )
}
