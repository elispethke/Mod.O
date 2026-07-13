import LegalLayout, { type LegalSection } from './LegalLayout'
import { SITE } from '@/constants/site'

const SECTIONS: LegalSection[] = [
  {
    slug: 'aceitacao',
    title: 'Aceitação dos termos',
    paragraphs: [
      `Ao acessar e utilizar este site, você concorda integralmente com estes Termos de Uso. Caso não concorde com qualquer disposição aqui prevista, recomendamos que não utilize o site da ${SITE.fullName}.`,
    ],
  },
  {
    slug: 'sobre',
    title: 'Sobre a mod.o Fashion Studio',
    paragraphs: [
      'A mod.o é um fashion studio que conecta criatividade, estratégia e visão global para desenvolver coleções com propósito, atuando entre o Brasil e a Europa. Este site tem caráter institucional e comercial, apresentando nossos serviços, portfólio e canais de contato.',
    ],
  },
  {
    slug: 'uso-do-site',
    title: 'Uso do site',
    paragraphs: ['Ao utilizar este site, você concorda em não:'],
    list: [
      'Utilizar o conteúdo para finalidades ilícitas ou não autorizadas.',
      'Tentar acessar áreas restritas, interferir na segurança ou no funcionamento do site.',
      'Reproduzir, distribuir ou explorar comercialmente o conteúdo sem autorização prévia e por escrito.',
      'Submeter, através dos formulários, informações falsas, ofensivas ou que violem direitos de terceiros.',
    ],
  },
  {
    slug: 'propriedade-intelectual',
    title: 'Propriedade intelectual',
    paragraphs: [
      'Todo o conteúdo disponível neste site — incluindo marca, logotipo, textos, imagens, layout e identidade visual — é de propriedade da mod.o Fashion Studio ou de seus licenciadores, sendo protegido pela legislação de propriedade intelectual aplicável.',
      'Nenhuma disposição destes Termos concede a você qualquer direito de uso da marca ou do conteúdo além da simples navegação para fins pessoais e não comerciais.',
    ],
  },
  {
    slug: 'formularios-e-propostas',
    title: 'Formulários de contato e propostas comerciais',
    paragraphs: [
      'O envio do formulário de contato não gera, por si só, qualquer vínculo contratual entre você e a mod.o. Eventuais propostas comerciais, escopos de trabalho e condições serão formalizados separadamente, mediante negociação entre as partes.',
    ],
  },
  {
    slug: 'links-terceiros',
    title: 'Links para sites de terceiros',
    paragraphs: [
      'Este site pode conter links para redes sociais e outros sites de terceiros. Não somos responsáveis pelo conteúdo, práticas de privacidade ou disponibilidade desses sites externos.',
    ],
  },
  {
    slug: 'limitacao-de-responsabilidade',
    title: 'Limitação de responsabilidade',
    paragraphs: [
      'Envidamos esforços razoáveis para manter as informações deste site atualizadas e precisas, mas não garantimos a ausência de erros, interrupções ou indisponibilidades. Na máxima extensão permitida pela lei, a mod.o não se responsabiliza por danos indiretos decorrentes do uso ou da impossibilidade de uso do site.',
    ],
  },
  {
    slug: 'alteracoes',
    title: 'Alterações destes termos',
    paragraphs: [
      'Podemos atualizar estes Termos de Uso periodicamente. A data da última atualização estará sempre indicada no topo desta página. Recomendamos a revisão periódica deste documento.',
    ],
  },
  {
    slug: 'lei-aplicavel',
    title: 'Lei aplicável e foro',
    paragraphs: [
      'Estes Termos de Uso são regidos pela legislação brasileira. Fica eleito o foro do domicílio da mod.o Fashion Studio para dirimir quaisquer controvérsias, ressalvadas disposições legais imperativas em contrário.',
    ],
  },
  {
    slug: 'contato',
    title: 'Contato',
    paragraphs: [
      `Dúvidas sobre estes Termos de Uso podem ser encaminhadas para ${SITE.email}.`,
    ],
  },
]

export default function TermsOfUsePage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Termos de Uso"
      updatedAt="13 de julho de 2026"
      intro="Estes Termos de Uso estabelecem as condições para utilização do site da mod.o Fashion Studio. Ao navegar por aqui, você concorda com as disposições descritas abaixo."
      sections={SECTIONS}
    />
  )
}
