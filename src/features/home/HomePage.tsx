import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '@/features/home/hero/Hero'
import About from '@/features/home/about/About'

// Abaixo da dobra — só o Hero e o About (imediatamente visíveis) carregam de forma eager,
// para não atrasar o LCP com um fetch de chunk extra.
const Services      = lazy(() => import('@/features/home/services/Services'))
const Process       = lazy(() => import('@/features/home/instagram/Process'))
const Pains         = lazy(() => import('@/features/home/pains/Pains'))
const BrandCards    = lazy(() => import('@/features/home/brand-cards/BrandCards'))
const InstagramGrid = lazy(() => import('@/features/home/instagram/InstagramGrid'))
const Contact       = lazy(() => import('@/features/home/contact/Contact'))
const Campanha      = lazy(() => import('@/features/home/campanha/Campanha'))

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => window.clearTimeout(id)
  }, [hash])

  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={null}>
        <Services />
        <Process />
        <Pains />
        <BrandCards />
        <InstagramGrid />
        <Contact />
        <Campanha />
      </Suspense>
    </>
  )
}
