import post01 from '@/assets/instagram/post-01.webp'
import post02 from '@/assets/instagram/post-02.webp'
import post03 from '@/assets/instagram/post-03.webp'
import post04 from '@/assets/instagram/post-04.webp'
import post05 from '@/assets/instagram/post-05.webp'
import post06 from '@/assets/instagram/post-06.webp'
import post07 from '@/assets/instagram/post-07.webp'
import post08 from '@/assets/instagram/post-08.webp'
import post09 from '@/assets/instagram/post-09.webp'
import post10 from '@/assets/instagram/post-10.webp'
import post11 from '@/assets/instagram/post-11.webp'
import post12 from '@/assets/instagram/post-12.webp'

export interface InstagramPost {
  src: string
  alt:  string
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  { src: post01, alt: 'Post do Instagram da mod.o — Nossos Serviços' },
  { src: post02, alt: 'Post do Instagram da mod.o — Quem está por trás da mod.o' },
  { src: post03, alt: 'Post do Instagram da mod.o — moodboard de pesquisa de moda' },
  { src: post04, alt: 'Post do Instagram da mod.o — pesquisa de tendências' },
  { src: post05, alt: 'Post do Instagram da mod.o — como a indústria da moda programa o desejo' },
  { src: post06, alt: 'Post do Instagram da mod.o — parece glamour, mas na verdade' },
  { src: post07, alt: 'Post do Instagram da mod.o — semana de alta costura em Paris' },
  { src: post08, alt: 'Post do Instagram da mod.o — bastidores de loja' },
  { src: post09, alt: 'Post do Instagram da mod.o — marcas na Berlim Fashion Week' },
  { src: post10, alt: 'Post do Instagram da mod.o — o mood é aquatic blues' },
  { src: post11, alt: 'Post do Instagram da mod.o — um dia com a cofundadora' },
  { src: post12, alt: 'Post do Instagram da mod.o — recap Milão e Paris Menswear' },
]
