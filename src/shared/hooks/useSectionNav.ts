import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

/** Scrolls to an in-page section hash when already on the home route, otherwise navigates home first. */
export function useSectionNav() {
  const location = useLocation()
  const navigate  = useNavigate()

  return (hash: string) => {
    if (location.pathname === ROUTES.home) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(`${ROUTES.home}${hash}`)
    }
  }
}
