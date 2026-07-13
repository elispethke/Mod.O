import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('junta classes simples', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('ignora valores falsy', () => {
    expect(cn('a', false, null, undefined, 0, 'b')).toBe('a b')
  })

  it('resolve classes condicionais via objeto', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active')
  })

  it('resolve conflitos de utilitários Tailwind mantendo o último', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })

  it('mantém classes arbitrárias do Tailwind intactas', () => {
    expect(cn('text-[clamp(1rem,2vw,2rem)]', 'font-bold')).toBe('text-[clamp(1rem,2vw,2rem)] font-bold')
  })
})
