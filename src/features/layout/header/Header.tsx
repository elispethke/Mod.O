import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import Logo from '@/shared/components/Logo'
import Nav from './Nav'
import { useScrollHeader } from './useScrollHeader'
import { ROUTES } from '@/constants/routes'

export default function Header() {
  const { isScrolled, isHidden } = useScrollHeader(60)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[40]',
        'transition-all duration-500 ease-elegant',
        isHidden && '-translate-y-full',
        isScrolled
          ? 'bg-base/95 backdrop-blur-md shadow-sm border-b border-support/[0.06]'
          : 'bg-transparent'
      )}
    >
      <div className="container-brand flex items-center justify-between h-16 md:h-20">
        <Link
          to={ROUTES.home}
          aria-label="mod.o Fashion Studio — Página inicial"
          className="flex-shrink-0 transition-opacity duration-300 hover:opacity-70"
        >
          <Logo
            variant="complementar"
            color="dark"
            className="[&>span:first-child]:text-2xl md:[&>span:first-child]:text-3xl"
          />
        </Link>

        <Nav isScrolled={isScrolled} />
      </div>
    </header>
  )
}
