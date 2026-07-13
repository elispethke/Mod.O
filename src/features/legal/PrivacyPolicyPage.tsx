import LegalLayout, { type LegalSection } from './LegalLayout'
import { SITE } from '@/constants/site'

const SECTIONS: LegalSection[] = [
  {
    slug: 'quem-somos',
    title: 'Quem somos',
    paragraphs: [
      `A ${SITE.fullName} ("mod.o", "nós") é um estúdio de moda com atuação entre o Brasil e a Europa, responsável pelo tratamento dos dados pessoais coletados através deste site.`,
      'Esta Política de Privacidade descreve quais dados coletamos, por que os coletamos, como são utilizados e quais direitos você possui em relação a eles.',
    ],
  },
  {
    slug: 'dados-coletados',
    title: 'Quais dados coletamos',
    paragraphs: [
      'Coletamos dados fornecidos diretamente por você e dados gerados automaticamente durante a navegação:',
    ],
    list: [
      'Dados de identificação e contato: nome, e-mail, telefone e empresa, informados no formulário de contato.',
      'Conteúdo da mensagem: informações sobre o projeto ou serviço de interesse.',
      'Dados de navegação: endereço IP, tipo de dispositivo, navegador, páginas visitadas e tempo de permanência.',
      'Cookies e identificadores semelhantes, conforme suas preferências de consentimento.',
    ],
  },
  {
    slug: 'finalidade',
    title: 'Como utilizamos seus dados',
    paragraphs: ['Utilizamos os dados coletados para as seguintes finalidades:'],
    list: [
      'Responder a solicitações de contato e elaborar propostas comerciais.',
      'Melhorar a experiência de navegação e o conteúdo do site.',
      'Cumprir obrigações legais e regulatórias aplicáveis.',
      'Com o seu consentimento, personalizar comunicações e medir a efetividade de campanhas.',
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookies e tecnologias de rastreamento',
    paragraphs: [
      'Utilizamos cookies necessários ao funcionamento do site e, mediante o seu consentimento, cookies analíticos, de marketing e de preferência.',
      'Você pode gerenciar suas escolhas a qualquer momento através do link "Preferências de Cookies", disponível no rodapé do site.',
    ],
  },
  {
    slug: 'compartilhamento',
    title: 'Compartilhamento de dados',
    paragraphs: [
      'Não vendemos seus dados pessoais. Podemos compartilhar dados com prestadores de serviço que nos auxiliam na operação do site (como hospedagem, formulários e ferramentas de analytics), sempre limitados ao necessário para a prestação do serviço contratado, e mediante obrigações contratuais de confidencialidade e segurança.',
      'Também podemos divulgar dados quando exigido por lei ou por autoridade competente.',
    ],
  },
  {
    slug: 'transferencia-internacional',
    title: 'Transferência internacional de dados',
    paragraphs: [
      'Em razão da nossa atuação entre Brasil e Europa, dados pessoais podem ser tratados ou armazenados em diferentes países. Nesses casos, adotamos salvaguardas compatíveis com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e, quando aplicável, com o Regulamento Geral de Proteção de Dados da União Europeia (GDPR).',
    ],
  },
  {
    slug: 'direitos-do-titular',
    title: 'Seus direitos',
    paragraphs: ['Nos termos da legislação aplicável, você pode solicitar, a qualquer momento:'],
    list: [
      'Confirmação da existência de tratamento e acesso aos seus dados.',
      'Correção de dados incompletos, inexatos ou desatualizados.',
      'Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei.',
      'Portabilidade dos dados a outro fornecedor de serviço.',
      'Revogação do consentimento e eliminação dos dados tratados com base nele.',
      'Informações sobre entidades com as quais compartilhamos seus dados.',
    ],
  },
  {
    slug: 'seguranca',
    title: 'Segurança da informação',
    paragraphs: [
      'Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados pessoais contra acessos não autorizados, perda, alteração ou divulgação indevida. Nenhum sistema é totalmente livre de riscos, e trabalhamos continuamente para aprimorar nossas práticas de segurança.',
    ],
  },
  {
    slug: 'retencao',
    title: 'Retenção de dados',
    paragraphs: [
      'Mantemos os dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, ou conforme exigido por obrigações legais, contratuais ou regulatórias.',
    ],
  },
  {
    slug: 'alteracoes',
    title: 'Alterações desta política',
    paragraphs: [
      'Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou na legislação aplicável. A data da última atualização estará sempre indicada no topo desta página.',
    ],
  },
  {
    slug: 'contato',
    title: 'Contato',
    paragraphs: [
      `Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato pelo e-mail ${SITE.email}.`,
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de Privacidade"
      updatedAt="13 de julho de 2026"
      intro="Respeitamos a sua privacidade. Esta página explica, de forma clara e transparente, como a mod.o Fashion Studio coleta, utiliza e protege os dados pessoais de quem visita o nosso site."
      sections={SECTIONS}
    />
  )
}
