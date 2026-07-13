import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useScrollHeader } from './useScrollHeader'

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true })
}

function fireScroll() {
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
}

describe('useScrollHeader', () => {
  afterEach(() => {
    setScrollY(0)
  })

  it('começa não-scrolled e não-hidden', () => {
    const { result } = renderHook(() => useScrollHeader(80))
    expect(result.current.isScrolled).toBe(false)
    expect(result.current.isHidden).toBe(false)
  })

  it('marca isScrolled=true ao passar do threshold', () => {
    const { result } = renderHook(() => useScrollHeader(80))

    setScrollY(120)
    fireScroll()

    expect(result.current.isScrolled).toBe(true)
    expect(result.current.scrollY).toBe(120)
  })

  it('esconde o header ao rolar para baixo além de threshold + 100', () => {
    const { result } = renderHook(() => useScrollHeader(80))

    setScrollY(100)
    fireScroll()
    setScrollY(300)
    fireScroll()

    expect(result.current.isHidden).toBe(true)
  })

  it('reexibe o header ao rolar para cima', () => {
    const { result } = renderHook(() => useScrollHeader(80))

    setScrollY(300)
    fireScroll()
    expect(result.current.isHidden).toBe(true)

    setScrollY(250)
    fireScroll()

    expect(result.current.isHidden).toBe(false)
  })

  it('remove o listener de scroll ao desmontar', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollHeader(80))

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
