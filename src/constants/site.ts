import type { NavItem, ServiceItem } from '@/types'

export const SITE = {
  name:        'mod.o',
  fullName:    'mod.o Fashion Studio',
  description: 'Fashion studio que conecta criatividade, estratégia e visão global para desenvolver coleções com propósito.',
  tagline:     'Moda com olhar. Moda com forma. Moda como conceito.',
  whatsapp:    '393520233222',
  email:       'contato.studiomod.o@gmail.com',
  instagram:   'https://www.instagram.com/mod.ofashionstudio/',
  linkedin:    'https://www.linkedin.com/in/brunadallegrave/',
} as const

export const NAV_ITEMS: NavItem[] = [
  { label: 'Sobre',      href: '#sobre' },
  { label: 'Serviços',   href: '#servicos' },
  { label: 'Galeria',    href: '#portfolio' },
  { label: 'Contato',    href: '#contato' },
]

export const SERVICES: ServiceItem[] = [
  {
    index:       '01',
    title:       'Criação de Produto & Direção Técnica',
    description: 'Desenvolvemos produtos com identidade, traduzindo a essência da sua marca em coleções estratégicas e comerciais.',
  },
  {
    index:       '02',
    title:       'Consultoria & Curadoria de Coleção',
    description: 'Estruturamos ideias e transformamos conceitos em coleções coesas, com estética e resultado.',
  },
  {
    index:       '03',
    title:       'Pesquisa Internacional & Tendências',
    description: 'Conectamos sua marca às tendências e mercados internacionais, com repertório global e personalização local.',
  },
  {
    index:       '04',
    title:       'Direção de Estilo & Identidade da Coleção',
    description: 'Definimos a linguagem estética do projeto — do conceito ao produto final, tudo com intenção e direção.',
  },
]
