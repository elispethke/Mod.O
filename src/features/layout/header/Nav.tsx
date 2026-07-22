import { useState } from 'react'
import { cn } from '@/utils/cn'
import { t } from '@/lib/i18n'
import { useSectionNav } from '@/shared/hooks/useSectionNav'
const NAV_KEYS = ['about', 'services', 'processo', 'contact'] as const
const NAV_HREFS: Record<typeof NAV_KEYS[number], string> = {
  about:     '#sobre',
  services:  '#servicos',
  processo: '#Processo',
  contact:   '#contato',
}

interface NavProps {
  isScrolled: boolean
}

export default function Nav({ isScrolled }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionNav = useSectionNav()

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    sectionNav(href)
  }

  return (
    <>
      {/* Desktop */}
      <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-8">
        {NAV_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => handleNavClick(NAV_HREFS[key])}
            className={cn(
              'relative font-body text-sm font-medium text-support',
              'transition-colors duration-base hover:text-primary',
              'after:absolute after:bottom-0 after:left-0 after:w-full after:h-px',
              'after:bg-primary after:scale-x-0 after:origin-right',
              'after:transition-transform after:duration-base after:ease-reveal',
              'hover:after:scale-x-100 hover:after:origin-left',
              isScrolled && 'text-support'
            )}
          >
            {t.nav[key]}
          </button>
        ))}

        <button
          onClick={() => handleNavClick('#contato')}
          className="
            ml-2 px-5 py-2.5
            font-body text-xs font-semibold tracking-[0.12em] uppercase
            bg-primary text-white rounded-sm
            transition-all duration-base ease-reveal
            hover:bg-primary-dim hover:shadow-red
            focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
          "
        >
          {t.nav.cta}
        </button>
      </nav>

      {/* Mobile toggle */}
      <button
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="flex md:hidden flex-col gap-[5px] w-6 justify-center py-1"
      >
        <span className={cn('w-full h-px bg-support transition-all duration-base origin-center', menuOpen && 'rotate-45 translate-y-[3px]')} />
        <span className={cn('w-4 h-px bg-support transition-all duration-base', menuOpen && 'opacity-0 translate-x-2')} />
        <span className={cn('w-full h-px bg-support transition-all duration-base origin-center', menuOpen && '-rotate-45 -translate-y-[9px]')} />
      </button>

      {/* Mobile drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
        className={cn(
          'fixed inset-0 z-drawer flex flex-col md:hidden bg-base',
          'transition-all duration-slow ease-reveal',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="container-brand flex flex-col justify-center h-full gap-6">
          {NAV_KEYS.map((key, i) => (
            <button
              key={key}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => handleNavClick(NAV_HREFS[key])}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              className={cn(
                'text-left font-display font-bold text-5xl text-support',
                'transition-all duration-slow ease-reveal',
                'hover:text-primary hover:translate-x-2',
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {t.nav[key]}
            </button>
          ))}

          <button
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => handleNavClick('#contato')}
            className="mt-4 w-fit px-8 py-3 bg-primary text-white font-body font-semibold text-xs tracking-[0.12em] uppercase rounded-sm"
          >
            {t.nav.cta}
          </button>
        </div>
      </div>
    </>
  )
}
