export const ROUTES = {
  home:    '/',
  privacy: '/politica-de-privacidade',
  terms:   '/termos-de-uso',
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES]
