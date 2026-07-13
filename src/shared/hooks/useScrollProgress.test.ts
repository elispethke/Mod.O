import { afterEach, describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useScrollProgress } from './useScrollProgress'

function setScrollDimensions({ scrollY, scrollHeight, innerHeight }: { scrollY: number; scrollHeight: number; innerHeight: number }) {
  Object.defineProperty(window, 'scrollY', { value: scrollY, writable: true, configurable: true })
  Object.defineProperty(document.documentElement, 'scrollHeight', { value: scrollHeight, writable: true, configurable: true })
  Object.defineProperty(window, 'innerHeight', { value: innerHeight, writable: true, configurable: true })
}

function fireScroll() {
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
}

describe('useScrollProgress', () => {
  afterEach(() => {
    setScrollDimensions({ scrollY: 0, scrollHeight: 0, innerHeight: 0 })
  })

  it('começa em 0', () => {
    const { result } = renderHook(() => useScrollProgress())
    expect(result.current).toBe(0)
  })

  it('calcula a proporção rolada corretamente', () => {
    // altura rolável = 3000 (scrollHeight) - 1000 (innerHeight) = 2000; scrollY = 500 → 25%
    setScrollDimensions({ scrollY: 500, scrollHeight: 3000, innerHeight: 1000 })
    const { result } = renderHook(() => useScrollProgress())

    fireScroll()

    expect(result.current).toBeCloseTo(0.25)
  })

  it('nunca ultrapassa 1, mesmo com scrollY maior que a altura rolável', () => {
    setScrollDimensions({ scrollY: 5000, scrollHeight: 3000, innerHeight: 1000 })
    const { result } = renderHook(() => useScrollProgress())

    fireScroll()

    expect(result.current).toBe(1)
  })

  it('não divide por zero quando a página não tem espaço para rolar', () => {
    setScrollDimensions({ scrollY: 0, scrollHeight: 500, innerHeight: 800 })
    const { result } = renderHook(() => useScrollProgress())

    fireScroll()

    expect(result.current).toBe(0)
  })
})
