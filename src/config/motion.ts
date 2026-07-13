/**
 * Curva de easing padrão de revelação da marca, como array numérico para a prop `ease`
 * do Framer Motion (que não aceita a string CSS `cubic-bezier(...)`).
 * Mesma curva de tokens.easing.reveal ('cubic-bezier(0.16, 1, 0.3, 1)') — mantenha as
 * duas em sincronia se a direção de arte da marca mudar a curva de revelação.
 */
export const EASE = [0.16, 1, 0.3, 1] as const
