import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useSectionNav } from './useSectionNav'
import { ROUTES } from '@/constants/routes'

function withRouter(initialPath: string) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="*" element={<>{children}</>} />
        </Routes>
      </MemoryRouter>
    )
  }
}

function useHarness() {
  return { nav: useSectionNav(), location: useLocation() }
}

describe('useSectionNav', () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('quando já está na home, rola até a âncora em vez de navegar', () => {
    document.body.innerHTML = '<section id="contato"></section>'

    const { result } = renderHook(() => useHarness(), { wrapper: withRouter(ROUTES.home) })

    act(() => result.current.nav('#contato'))

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    expect(result.current.location.pathname).toBe(ROUTES.home)
  })

  it('quando não encontra a âncora na home, não lança erro', () => {
    document.body.innerHTML = ''
    const { result } = renderHook(() => useHarness(), { wrapper: withRouter(ROUTES.home) })

    expect(() => act(() => result.current.nav('#nao-existe'))).not.toThrow()
  })

  it('quando está em outra rota, navega para a home com a âncora em vez de rolar', () => {
    const { result } = renderHook(() => useHarness(), { wrapper: withRouter(ROUTES.privacy) })

    act(() => result.current.nav('#contato'))

    expect(result.current.location.pathname).toBe(ROUTES.home)
    expect(result.current.location.hash).toBe('#contato')
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled()
  })
})
