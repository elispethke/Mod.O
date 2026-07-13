import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import { t } from '@/lib/i18n'
import { SITE, NAV_ITEMS } from '@/constants/site'
import { ROUTES } from '@/constants/routes'
import { useSectionNav } from '@/shared/hooks/useSectionNav'
import { useCookieConsent } from '@/features/cookie-consent'
import FooterLink from './FooterLink'
import { EASE } from '@/config/motion'

const fadeUp = (delay: number) => ({
  initial:    { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true, margin: '0px 0px -60px 0px' },
  transition: { duration: 0.7, delay, ease: EASE },
})

const SOCIAL_ITEMS = [
  {
    label: 'Instagram',
    href:  SITE.instagram,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  SITE.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.5 10v6.5M7.5 7.2v.1M11.5 16.5V10M11.5 12.7c0-1.5 1-2.7 2.5-2.7s2.5 1.2 2.5 2.7v3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Footer() {
  const sectionNav = useSectionNav()
  const { openPreferences } = useCookieConsent()

  const year = new Date().getFullYear()

  return (
    <footer
      className="relative bg-primary overflow-hidden pt-24 pb-10 lg:pt-32 lg:pb-12"
      aria-label="Rodapé"
    >
      <span
        className="absolute -bottom-[10%] -right-[4%] font-display font-bold text-[26vw] leading-none text-white/[0.05] whitespace-nowrap select-none pointer-events-none"
        aria-hidden="true"
      >
        o
      </span>

      <div className="relative z-10 container-brand">

        {/* Chamada editorial */}
        <motion.div {...fadeUp(0)} className="max-w-2xl mb-20 lg:mb-28">
          <span className="tracking-editorial text-white font-body block mb-6">
            {SITE.name} fashion studio
          </span>
          <button
            type="button"
            onClick={() => sectionNav('#contato')}
            className="group flex items-start gap-5 text-left"
          >
            <h2
              className="font-display font-bold text-white leading-[0.98] transition-colors duration-medium group-hover:text-base text-[clamp(2.25rem,5vw,4.5rem)] tracking-[-0.02em]"
            >
              Vamos criar algo excepcional juntos.
            </h2>
            <span className="mt-3 lg:mt-6 inline-flex items-center justify-center w-11 h-11 lg:w-14 lg:h-14 rounded-full border border-white shrink-0 transition-all duration-medium group-hover:bg-white group-hover:border-white">
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" className="text-white transition-all duration-medium -rotate-45 group-hover:rotate-0 group-hover:text-primary" aria-hidden="true">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </motion.div>

        <motion.div {...fadeUp(0.05)} className="h-px bg-white/25 mb-16 lg:mb-20" />

        {/* Grid principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-14 gap-x-8 mb-20 lg:mb-24">

          {/* Marca */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-4 flex flex-col gap-6">
            <Logo variant="complementar" color="light" className="[&>span:first-child]:text-2xl" />
            <p className="font-body text-white leading-relaxed max-w-[26ch] text-sm">
              {SITE.description}
            </p>
            <span className="tracking-editorial text-white font-body">
              Brasil &amp; Europa
            </span>
          </motion.div>

          {/* Navegação */}
          <motion.nav {...fadeUp(0.15)} aria-label="Navegação do rodapé" className="lg:col-span-3 lg:col-start-6 flex flex-col gap-6">
            <span className="tracking-editorial text-white font-body">{t.footer.navigation}</span>
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <FooterLink onClick={() => sectionNav(item.href)}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contato */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-3 flex flex-col gap-6">
            <span className="tracking-editorial text-white font-body">{t.footer.contact}</span>
            <ul className="flex flex-col gap-4">
              <li>
                <FooterLink href={`mailto:${SITE.email}`}>{SITE.email}</FooterLink>
              </li>
              <li>
                <FooterLink href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </FooterLink>
              </li>
            </ul>
          </motion.div>

          {/* Redes sociais */}
          <motion.div {...fadeUp(0.25)} className="lg:col-span-2 flex flex-col gap-6">
            <span className="tracking-editorial text-white font-body">{t.footer.social}</span>
            <ul className="flex flex-col gap-4">
              {SOCIAL_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} da ${SITE.fullName}`}
                    className="group inline-flex items-center gap-3 text-white transition-transform duration-base hover:translate-x-1"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white shrink-0 transition-colors duration-base group-hover:bg-white group-hover:text-primary">
                      {item.icon}
                    </span>
                    <span className="font-body text-sm font-medium relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-medium ease-out group-hover:scale-x-100" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="h-px bg-white/25 mb-8" />
        <div
          className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="font-body text-white text-xs">
            © {year} {SITE.fullName}. {t.footer.rights}
            <span className="mx-2 text-white/40" aria-hidden="true">·</span>
            Desenvolvido por{' '}
            <a
              href="https://www.elispethke.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white transition-colors duration-base hover:text-base underline decoration-white/40 underline-offset-4 hover:decoration-base"
            >
              Buildle
            </a>
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              to={ROUTES.privacy}
              className="font-body text-xs font-medium text-white transition-colors duration-base hover:text-base underline decoration-white/40 underline-offset-4 hover:decoration-base"
            >
              {t.footer.legal.privacy}
            </Link>
            <Link
              to={ROUTES.terms}
              className="font-body text-xs font-medium text-white transition-colors duration-base hover:text-base underline decoration-white/40 underline-offset-4 hover:decoration-base"
            >
              {t.footer.legal.terms}
            </Link>
            <button
              type="button"
              onClick={openPreferences}
              className="font-body text-xs font-medium text-white transition-colors duration-base hover:text-base underline decoration-white/40 underline-offset-4 hover:decoration-base"
            >
              {t.footer.legal.cookiePreferences}
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
