export const tokens = {
  colors: {
    // Brand Guideline — Sistema de Cores (página 12)
    primary:      '#BA1110', // Vermelho — 50% — identidade, fundos de destaque
    base:         '#F2F0EF', // Off White — 30% — fundos principais, respiro visual
    accent:       '#F6D2DC', // Rosa Candy — 10% — editorial, toque feminino
    support:      '#000000', // Preto — 10% — textos corridos, detalhes
    white:        '#FFFFFF', // Branco puro — logo sobre vermelho

    // Derivados para uso digital (sem alterar a identidade)
    primaryDim:   '#8C0C0B', // Vermelho escuro — hover states sobre vermelho
    accentStrong: '#EEB5C4', // Rosa mais intenso — border focus
  },

  fonts: {
    // Brand Guideline — Tipografia (páginas 13-14)
    display: ['Parabolica', 'DM Sans', 'sans-serif'] as const,
    body:    ['Franie', 'Inter', 'Helvetica Neue', 'sans-serif'] as const,
  },

  fontSize: {
    '2xs': ['0.625rem',  { lineHeight: '1' }],
    xs:    ['0.75rem',   { lineHeight: '1.4' }],
    sm:    ['0.875rem',  { lineHeight: '1.5' }],
    base:  ['1rem',      { lineHeight: '1.6' }],
    lg:    ['1.125rem',  { lineHeight: '1.55' }],
    xl:    ['1.25rem',   { lineHeight: '1.4' }],
    '2xl': ['1.5rem',    { lineHeight: '1.3' }],
    '3xl': ['2rem',      { lineHeight: '1.2' }],
    '4xl': ['2.5rem',    { lineHeight: '1.15' }],
    '5xl': ['3.5rem',    { lineHeight: '1.05' }],
    '6xl': ['5rem',      { lineHeight: '1' }],
    '7xl': ['7rem',      { lineHeight: '0.95' }],
    '8xl': ['9rem',      { lineHeight: '0.9' }],
    '9xl': ['12rem',     { lineHeight: '0.85' }],
  } as Record<string, [string, { lineHeight: string }]>,

  spacing: {
    px:    '1px',
    0:     '0',
    0.5:   '2px',
    1:     '4px',
    1.5:   '6px',
    2:     '8px',
    2.5:   '10px',
    3:     '12px',
    3.5:   '14px',
    4:     '16px',
    5:     '20px',
    6:     '24px',
    7:     '28px',
    8:     '32px',
    9:     '36px',
    10:    '40px',
    11:    '44px',
    12:    '48px',
    14:    '56px',
    16:    '64px',
    18:    '72px',
    20:    '80px',
    24:    '96px',
    28:    '112px',
    32:    '128px',
    36:    '144px',
    40:    '160px',
    44:    '176px',
    48:    '192px',
    52:    '208px',
    56:    '224px',
    60:    '240px',
    64:    '256px',
    72:    '288px',
    80:    '320px',
    96:    '384px',
  },

  radius: {
    none:  '0px',
    sm:    '2px',
    DEFAULT: '4px',
    md:    '6px',
    lg:    '8px',
    xl:    '12px',
    '2xl': '16px',
    full:  '9999px',
  },

  shadow: {
    sm:    '0 1px 2px rgba(0,0,0,0.05)',
    DEFAULT:'0 2px 8px rgba(0,0,0,0.07)',
    md:    '0 4px 16px rgba(0,0,0,0.08)',
    lg:    '0 8px 32px rgba(0,0,0,0.10)',
    xl:    '0 16px 48px rgba(0,0,0,0.12)',
    '2xl': '0 24px 64px rgba(0,0,0,0.14)',
    red:   '0 8px 32px rgba(186,17,16,0.20)',
    'red-lg': '0 16px 48px rgba(186,17,16,0.30)',
    none:  'none',
  },

  blur: {
    sm:   '4px',
    DEFAULT: '8px',
    md:   '12px',
    lg:   '24px',
    xl:   '48px',
    '2xl':'64px',
  },

  motion: {
    instant: '0ms',
    fast:    '150ms',
    base:    '300ms',
    slow:    '500ms',
    slower:  '700ms',
    slowest: '900ms',
  },

  easing: {
    elegant: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    reveal:  'cubic-bezier(0.16, 1, 0.3, 1)',
    subtle:  'cubic-bezier(0.4, 0, 0.2, 1)',
    spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  zIndex: {
    hide:    '-1',
    base:    '0',
    raised:  '10',
    overlay: '20',
    modal:   '30',
    header:  '40',
    toast:   '50',
  },

  container: {
    sm:    '640px',
    md:    '768px',
    lg:    '1024px',
    xl:    '1280px',
    '2xl': '1440px',
    fluid: '100%',
  },
} as const

export type ColorToken   = keyof typeof tokens.colors
export type FontToken    = keyof typeof tokens.fonts
export type ShadowToken  = keyof typeof tokens.shadow
export type MotionToken  = keyof typeof tokens.motion
