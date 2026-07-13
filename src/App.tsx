import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from '@/features/layout/header/Header'
import Footer from '@/features/layout/footer/Footer'
import WhatsAppButton from '@/shared/components/WhatsAppButton'
import ScrollProgress from '@/shared/components/ScrollProgress'
import HomePage from '@/features/home/HomePage'
import { PrivacyPolicyPage, TermsOfUsePage } from '@/features/legal'
import { CookieConsentProvider, CookieBanner, CookiePreferencesModal } from '@/features/cookie-consent'
import { ROUTES } from '@/constants/routes'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <CookieConsentProvider>
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <main>
        <Routes>
          <Route path={ROUTES.home}    element={<HomePage />} />
          <Route path={ROUTES.privacy} element={<PrivacyPolicyPage />} />
          <Route path={ROUTES.terms}   element={<TermsOfUsePage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
      <CookiePreferencesModal />
    </CookieConsentProvider>
  )
}
