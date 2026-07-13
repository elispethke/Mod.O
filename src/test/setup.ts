import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Sem "globals: true" no Vitest, a limpeza automática do Testing Library entre
// testes não é registrada sozinha — precisa ser feita explicitamente aqui.
afterEach(() => {
  cleanup()
})

// jsdom não implementa scrollIntoView — vários hooks/componentes do site o chamam
// (navegação por âncora, sumário das páginas legais). Sem o stub, qualquer teste que
// passe por esse caminho quebra com "not implemented", sem relação com o que está sendo testado.
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}
