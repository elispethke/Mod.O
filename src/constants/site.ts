import type { NavItem, ServiceItem } from '@/types'

export const SITE = {
  name:        'mod.o',
  fullName:    'mod.o Fashion Studio',
  description: 'Fashion studio que conecta criatividade, estratégia e visão global para desenvolver coleções com propósito.',
  tagline:     'Moda com olhar. Moda com forma. Moda como conceito.',
  whatsapp:    '393520233222',
  email:       'contato.studiomod.o@gmail.com',
  instagram:   'https://www.instagram.com/mod.ofashionstudio/',
  linkedin:    'https://www.linkedin.com/company/modo-fashionstudio/',
} as const

export const NAV_ITEMS: NavItem[] = [
  { label: 'Sobre',      href: '#sobre' },
  { label: 'Serviços',   href: '#servicos' },
  { label: 'Processo',   href: '#processo' },
  { label: 'Contato',    href: '#contato' },
]

export const SERVICES: ServiceItem[] = [
  {
    index:       '01',
    title:       'Pesquisa & Curadoria',
    description: 'Pesquisas autorais e reports que traduzem comportamento, movimentos globais e referências de moda em direcionamentos criativos aplicáveis à coleção e ao universo da marca. Transformamos repertório em clareza para apoiar decisões mais consistentes.',
  },
  {
    index:       '02',
    title:       'Direção Criativa Estratégica',
    description: 'Construção de conceitos, narrativas e direcionamentos estéticos que dão unidade à coleção. Cada decisão fortalece a identidade da marca e estabelece uma relação coerente entre produto, linguagem visual e posicionamento.',
  },
  {
    index:       '03',
    title:       'Desenvolvimento de Coleção',
    description: 'Desenvolvemos produtos com direção estética clara, coerência de mix e alinhamento entre criatividade, posicionamento e viabilidade comercial. Porque uma boa coleção não depende apenas de peças fortes, mas da relação entre elas.',
  },
  {
    index:       '04',
    title:       'Visualização com IA',
    description: 'Aplicamos inteligência artificial ao processo criativo para explorar possibilidades, validar conceitos e antecipar decisões. Utilizamos a tecnologia como ferramenta estratégica para acelerar o desenvolvimento, ampliar a visualização de cenários e apoiar escolhas mais precisas.',
  },
]
