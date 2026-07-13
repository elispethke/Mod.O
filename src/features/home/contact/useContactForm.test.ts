import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { contactFormSchema, useContactForm } from './useContactForm'

const validPayload = {
  name:    'Ana Souza',
  email:   'ana@exemplo.com',
  phone:   '+55 11 91234-5678',
  company: 'Estúdio Ana',
  service: 'consultoria',
  message: 'Gostaria de saber mais sobre os serviços de consultoria de coleção.',
}

describe('contactFormSchema', () => {
  it('aceita um payload completo e válido', () => {
    const result = contactFormSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it('aceita o campo company vazio, por ser opcional', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, company: undefined })
    expect(result.success).toBe(true)
  })

  it('rejeita nome com menos de 2 caracteres', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejeita e-mail em formato inválido', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, email: 'nao-e-um-email' })
    expect(result.success).toBe(false)
  })

  it('rejeita mensagem com menos de 20 caracteres', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, message: 'muito curta' })
    expect(result.success).toBe(false)
  })

  it('rejeita quando nenhum serviço é selecionado', () => {
    const result = contactFormSchema.safeParse({ ...validPayload, service: '' })
    expect(result.success).toBe(false)
  })

  describe('validação de telefone', () => {
    it('rejeita texto sem nenhum dígito (regressão do bug de min(10) puro)', () => {
      const result = contactFormSchema.safeParse({ ...validPayload, phone: 'aaaaaaaaaa' })
      expect(result.success).toBe(false)
    })

    it('rejeita telefone curto demais', () => {
      const result = contactFormSchema.safeParse({ ...validPayload, phone: '123' })
      expect(result.success).toBe(false)
    })

    it.each([
      '+55 11 91234-5678',
      '(11) 91234-5678',
      '+39 352 023 3222',
      '11912345678',
    ])('aceita formato de telefone válido: %s', (phone) => {
      const result = contactFormSchema.safeParse({ ...validPayload, phone })
      expect(result.success).toBe(true)
    })
  })
})

/** Preenche o formulário com dados válidos, direto no estado do react-hook-form (sem precisar de DOM/inputs). */
async function fillValidForm(form: ReturnType<typeof useContactForm>['form']) {
  await act(async () => {
    form.setValue('name', validPayload.name)
    form.setValue('email', validPayload.email)
    form.setValue('phone', validPayload.phone)
    form.setValue('company', validPayload.company)
    form.setValue('service', validPayload.service)
    form.setValue('message', validPayload.message)
  })
}

describe('useContactForm — fluxo de envio (não inclui o envio real ao Formspree)', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('em caso de sucesso: chama o Formspree com o payload certo e marca submitted=true', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 200 }))

    const { result } = renderHook(() => useContactForm())
    await fillValidForm(result.current.form)

    await act(async () => result.current.onSubmit())

    expect(fetch).toHaveBeenCalledTimes(1)
    const [url, init] = vi.mocked(fetch).mock.calls[0]
    expect(String(url)).toMatch(/^https:\/\/formspree\.io\/f\//)
    expect(init?.method).toBe('POST')
    expect(JSON.parse(init?.body as string)).toMatchObject({ name: validPayload.name, email: validPayload.email })

    await waitFor(() => expect(result.current.submitted).toBe(true))
    expect(result.current.serverError).toBeNull()
  })

  it('quando o Formspree responde com erro, mostra mensagem de erro e não marca como enviado', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 422 }))

    const { result } = renderHook(() => useContactForm())
    await fillValidForm(result.current.form)

    await act(async () => result.current.onSubmit())

    await waitFor(() => expect(result.current.serverError).toBe('Não foi possível enviar. Tente novamente.'))
    expect(result.current.submitted).toBe(false)
  })

  it('quando a rede falha (fetch rejeita), mostra mensagem de erro de conexão', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new TypeError('Failed to fetch'))

    const { result } = renderHook(() => useContactForm())
    await fillValidForm(result.current.form)

    await act(async () => result.current.onSubmit())

    await waitFor(() => expect(result.current.serverError).toBe('Erro de conexão. Tente novamente.'))
    expect(result.current.submitted).toBe(false)
  })

  it('não envia nada ao Formspree se o formulário tem dados inválidos', async () => {
    const { result } = renderHook(() => useContactForm())
    // Formulário permanece com os valores padrão (vazios) — inválido pelo schema.

    await act(async () => result.current.onSubmit())

    expect(fetch).not.toHaveBeenCalled()
    expect(result.current.submitted).toBe(false)
  })

  it('sem VITE_FORMSPREE_ENDPOINT configurada, mostra erro amigável em vez de falhar silenciosamente', async () => {
    vi.stubEnv('VITE_FORMSPREE_ENDPOINT', '')
    vi.resetModules()
    const { useContactForm: useContactFormWithoutEndpoint } = await import('./useContactForm')

    const { result } = renderHook(() => useContactFormWithoutEndpoint())
    await fillValidForm(result.current.form)

    await act(async () => result.current.onSubmit())

    expect(fetch).not.toHaveBeenCalled()
    await waitFor(() => expect(result.current.serverError).toMatch(/temporariamente indisponível/i))

    vi.resetModules()
  })
})
