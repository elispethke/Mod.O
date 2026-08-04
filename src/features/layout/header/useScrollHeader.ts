import { useEffect, useRef, useState } from 'react'

interface ScrollHeaderState {
  isScrolled:  boolean
  isHidden:    boolean
  scrollY:     number
}

export function useScrollHeader(threshold = 80): ScrollHeaderState {
  const [state, setState] = useState<ScrollHeaderState>({
    isScrolled: false,
    isHidden:   false,
    scrollY:    0,
  })

  const lastScrollY = useRef(0)

  useEffect(() => {
    const update = () => {
      const current    = window.scrollY
      const isScrolled = current > threshold

      setState({ isScrolled, isHidden: false, scrollY: current })
      lastScrollY.current = current
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])

  return state
}
