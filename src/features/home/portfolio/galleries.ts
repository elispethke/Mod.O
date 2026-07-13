import altaCostura1 from '@/assets/g-alta-costura/alta_costura_1.png'
import altaCostura2 from '@/assets/g-alta-costura/alta_costura_2.png'
import altaCostura3 from '@/assets/g-alta-costura/alta_costura_3.png'
import altaCostura4 from '@/assets/g-alta-costura/alta_costura_4.png'
import altaCostura5 from '@/assets/g-alta-costura/alta_costura_5.png'
import altaCostura6 from '@/assets/g-alta-costura/alta_costura_6.png'

import vestidoFesta1 from '@/assets/vestido-de-festa/vestido_festa_1.png'
import vestidoFesta2 from '@/assets/vestido-de-festa/vestido_festa_2.png'
import vestidoFesta3 from '@/assets/vestido-de-festa/vestido_festa_3.png'
import vestidoFesta4 from '@/assets/vestido-de-festa/vestido_festa_4.png'
import vestidoFesta5 from '@/assets/vestido-de-festa/vestido_festa_5.png'
import vestidoFesta6 from '@/assets/vestido-de-festa/vestido_festa_6.png'

import modaCasual1 from '@/assets/moda-casual/jeans_sofisticado_1.png'
import modaCasual2 from '@/assets/moda-casual/jeans_sofisticado_2.png'
import modaCasual3 from '@/assets/moda-casual/jeans_sofisticado_3.png'
import modaCasual4 from '@/assets/moda-casual/jeans_sofisticado_4.png'
import modaCasual5 from '@/assets/moda-casual/jeans_sofisticado_5.png'
import modaCasual6 from '@/assets/moda-casual/jeans_sofisticado_6.png'

export interface GalleryCardData {
  src:      string
  alt:      string
  caption:  string
}

export interface GalleryData {
  id:       string
  index:    string
  title:    string
  subtitle: string
  cards:    GalleryCardData[]
}

export const GALLERIES: GalleryData[] = [
  {
    id:       'alta-costura',
    index:    '01',
    title:    'Alta Costura',
    subtitle: 'Peças únicas, construídas à mão para os momentos mais importantes — onde cada detalhe é uma assinatura de excelência.',
    cards: [
      { src: altaCostura1, alt: 'Vestido de alta costura bordado, com capa de tule e brilho cristalizado', caption: 'Bordado cristalizado' },
      { src: altaCostura2, alt: 'Look de alta costura em desfile internacional', caption: 'Silhueta esculpida' },
      { src: altaCostura3, alt: 'Vestido de alta costura com aplicações florais tridimensionais em tule verde-sálvia', caption: 'Flores em camadas' },
      { src: altaCostura4, alt: 'Peça de alta costura com tecido drapeado e acabamento artesanal', caption: 'Drapeado artesanal' },
      { src: altaCostura5, alt: 'Look de alta costura em passarela, com construção escultural', caption: 'Construção escultural' },
      { src: altaCostura6, alt: 'Vestido de alta costura com bordados e textura preciosa', caption: 'Textura preciosa' },
    ],
  },
  {
    id:       'vestidos-de-festa',
    index:    '02',
    title:    'Vestidos de Festa',
    subtitle: 'Silhuetas que celebram o corpo e o momento — elegância fluida para noites que merecem ser lembradas.',
    cards: [
      { src: vestidoFesta1, alt: 'Vestido de festa em cetim azul-marinho com fenda lateral', caption: 'Cetim noturno' },
      { src: vestidoFesta2, alt: 'Vestido de festa longo com caimento fluido', caption: 'Caimento fluido' },
      { src: vestidoFesta3, alt: 'Vestido de festa com brilho e acabamento sofisticado', caption: 'Brilho contido' },
      { src: vestidoFesta4, alt: 'Vestido de festa com modelagem precisa e elegância contemporânea', caption: 'Elegância contemporânea' },
      { src: vestidoFesta5, alt: 'Vestido de festa em tecido nobre para ocasiões especiais', caption: 'Tecido nobre' },
      { src: vestidoFesta6, alt: 'Vestido de festa com silhueta refinada e movimento', caption: 'Movimento refinado' },
    ],
  },
  {
    id:       'moda-casual',
    index:    '03',
    title:    'Moda Casual',
    subtitle: 'O refinamento do dia a dia — alfaiataria descontraída, cortes precisos e uma atitude naturalmente sofisticada.',
    cards: [
      { src: modaCasual1, alt: 'Look casual sofisticado com camisa branca, jeans e bolsa de couro', caption: 'Alfaiataria descontraída' },
      { src: modaCasual2, alt: 'Produção de moda casual premium em cenário urbano', caption: 'Atitude urbana' },
      { src: modaCasual3, alt: 'Look casual elegante com peças de corte preciso', caption: 'Corte preciso' },
      { src: modaCasual4, alt: 'Look casual sofisticado em tons neutros, com alfaiataria leve', caption: 'Tons neutros' },
      { src: modaCasual5, alt: 'Produção de moda casual refinada com acessórios de couro', caption: 'Acabamento refinado' },
      { src: modaCasual6, alt: 'Look casual premium com jeans e blazer estruturado', caption: 'Denim premium' },
    ],
  },
]
