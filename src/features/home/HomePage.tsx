import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Hero      = lazy(() => import('@/features/home/hero/Hero'))
const About     = lazy(() => import('@/features/home/about/About'))
const Services  = lazy(() => import('@/features/home/services/Services'))
const Portfolio = lazy(() => import('@/features/home/portfolio/Portfolio'))
const Contact   = lazy(() => import('@/features/home/contact/Contact'))

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
    <Suspense fallback={null}>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
    </Suspense>
  )
}
