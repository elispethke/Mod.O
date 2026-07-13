import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Substitua pelo ID do seu formulário no Formspree: https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const schema = z.object({
  name:    z.string().min(2,  'Nome obrigatório'),
  email:   z.string().email(  'E-mail inválido'),
  phone:   z.string().min(10, 'Telefone inválido'),
  company: z.string().optional(),
  service: z.string().min(1,  'Selecione um serviço'),
  message: z.string().min(20, 'Escreva pelo menos 20 caracteres'),
})

export type ContactFormData = z.infer<typeof schema>

export const SERVICE_OPTIONS = [
  { value: 'criacao-produto',   label: 'Criação de Produto & Direção Técnica' },
  { value: 'consultoria',       label: 'Consultoria & Curadoria de Coleção'   },
  { value: 'pesquisa',          label: 'Pesquisa Internacional & Tendências'   },
  { value: 'direcao-estilo',    label: 'Direção de Estilo & Identidade'        },
  { value: 'outro',             label: 'Outro'                                 },
]

export function useContactForm() {
  const [submitted,  setSubmitted]  = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '', email: '', phone: '', company: '', service: '', message: '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    setServerError(null)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        setServerError('Não foi possível enviar. Tente novamente.')
      }
    } catch {
      setServerError('Erro de conexão. Tente novamente.')
    }
  })

  return { form, onSubmit, submitted, serverError }
}
