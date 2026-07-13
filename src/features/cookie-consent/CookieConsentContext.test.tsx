import { beforeEach, describe, expect, it } from 'vitest'
import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieConsentProvider } from './CookieConsentContext'
import { useCookieConsent } from './useCookieConsent'
import { readStoredConsent, writeStoredConsent } from './storage'

function TestConsumer() {
  const { consent, hasDecided, isBannerVisible, acceptAll, rejectOptional, updateCategory, savePreferences } = useCookieConsent()

  return (
    <div>
      <span data-testid="has-decided">{String(hasDecided)}</span>
      <span data-testid="banner-visible">{String(isBannerVisible)}</span>
      <span data-testid="analytics">{String(consent.analytics)}</span>
      <span data-testid="marketing">{String(consent.marketing)}</span>
      <button onClick={acceptAll}>Aceitar todos</button>
      <button onClick={rejectOptional}>Rejeitar opcionais</button>
      {/* Dois controles separados, como no CookiePreferencesModal real: o switch dispara
          updateCategory no onChange, e o botão "Salvar" dispara savePreferences depois,
          numa interação distinta — nunca no mesmo clique. */}
      <button onClick={() => updateCategory('marketing', true)}>Ativar marketing</button>
      <button onClick={savePreferences}>Salvar preferências</button>
    </div>
  )
}

describe('CookieConsentProvider / useCookieConsent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lança erro se usado fora do provider', () => {
    expect(() => renderHook(() => useCookieConsent())).toThrow(
      'useCookieConsent deve ser usado dentro de CookieConsentProvider'
    )
  })

  it('para um visitante novo, nasce com hasDecided=false e o banner visível', () => {
    render(<CookieConsentProvider><TestConsumer /></CookieConsentProvider>)

    expect(screen.getByTestId('has-decided')).toHaveTextContent('false')
    expect(screen.getByTestId('banner-visible')).toHaveTextContent('true')
  })

  it('inicializa já "decidido" quando existe consentimento salvo (sem flash de banner)', () => {
    writeStoredConsent({ necessary: true, analytics: true, marketing: false, preferences: false })

    render(<CookieConsentProvider><TestConsumer /></CookieConsentProvider>)

    expect(screen.getByTestId('has-decided')).toHaveTextContent('true')
    expect(screen.getByTestId('banner-visible')).toHaveTextContent('false')
    expect(screen.getByTestId('analytics')).toHaveTextContent('true')
  })

  it('acceptAll ativa todas as categorias e persiste no localStorage', async () => {
    const user = userEvent.setup()
    render(<CookieConsentProvider><TestConsumer /></CookieConsentProvider>)

    await user.click(screen.getByText('Aceitar todos'))

    expect(screen.getByTestId('has-decided')).toHaveTextContent('true')
    expect(screen.getByTestId('analytics')).toHaveTextContent('true')
    expect(screen.getByTestId('marketing')).toHaveTextContent('true')
    expect(readStoredConsent()?.marketing).toBe(true)
  })

  it('rejectOptional mantém apenas os cookies necessários', async () => {
    const user = userEvent.setup()
    render(<CookieConsentProvider><TestConsumer /></CookieConsentProvider>)

    await user.click(screen.getByText('Rejeitar opcionais'))

    expect(screen.getByTestId('analytics')).toHaveTextContent('false')
    expect(screen.getByTestId('marketing')).toHaveTextContent('false')
    expect(readStoredConsent()?.analytics).toBe(false)
  })

  it('updateCategory seguido de savePreferences (interações separadas) persiste a categoria alterada', async () => {
    const user = userEvent.setup()
    render(<CookieConsentProvider><TestConsumer /></CookieConsentProvider>)

    await user.click(screen.getByText('Ativar marketing'))
    expect(screen.getByTestId('marketing')).toHaveTextContent('true')

    await user.click(screen.getByText('Salvar preferências'))

    expect(screen.getByTestId('analytics')).toHaveTextContent('false')
    expect(readStoredConsent()?.marketing).toBe(true)
  })

  it('updateCategory nunca desativa a categoria "necessary"', async () => {
    const { result } = renderHook(() => useCookieConsent(), {
      wrapper: ({ children }) => <CookieConsentProvider>{children}</CookieConsentProvider>,
    })

    act(() => result.current.updateCategory('necessary', false))

    expect(result.current.consent.necessary).toBe(true)
  })
})
