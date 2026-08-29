import type { Article } from '@/types/kenn'

export default {
  id: 'LORE-006',
  title: 'Evolution Stone Grading Standards',
  category: 'LORE',
  loreCategory: 'MECHANIC',
  author: 'KENN',
  summary:
    'Evolution stones are graded according to the concentration and purity of Type Energy contained within the stone, with higher grades producing greater potency and efficacy during evolution.',
  tags: ['Evolution', 'Evolution Stones', 'Type Energy', 'Mechanics'],
  regions: [],
  date: '08/28/2026',
  content: [
      {
        type: 'paragraph',
        text:
          'Evolution stones are graded according to the concentration and purity of Type Energy (T.E.) contained within the ore. Each grade represents a bracket of potency and efficacy, influencing the evolutionary process and potentially the resulting state of the evolved Pokémon.',
      },
      {
        type: 'subheading',
        text: 'Grade One — Supreme Quality',
      },
      {
        type: 'label',
        text: 'Purity: 80–95%',
        color: 'primary',
      },
      {
        type: 'paragraph',
        text:
          'The highest recognized grade of evolution stone. Grade One stones contain exceptionally concentrated Type Energy and are considered the most potent and reliable stones available.',
      },
      {
        type: 'subheading',
        text: 'Grade Two — Superior Quality',
      },
      {
        type: 'label',
        text: 'Purity: 65–79%',
        color: 'primary',
      },
      {
        type: 'paragraph',
        text:
          'High-quality evolution stones with a strong concentration of Type Energy. Grade Two stones are considered highly effective for evolutionary use.',
      },
      {
        type: 'subheading',
        text: 'Grade Three — Standard Quality',
      },
      {
        type: 'label',
        text: 'Purity: 50–64%',
        color: 'primary',
      },
      {
        type: 'paragraph',
        text:
          'The standard commercial grade of evolution stone. These stones contain a sufficient concentration of Type Energy for reliable evolutionary use and represent the baseline quality most commonly encountered.',
      },
      {
        type: 'subheading',
        text: 'Grade Four — Inferior Quality',
      },
      {
        type: 'label',
        text: 'Purity: 35–49%',
        color: 'primary',
      },
      {
        type: 'paragraph',
        text:
          'Lower-quality stones with a significantly reduced concentration of Type Energy. Their efficacy is diminished compared with higher grades.',
      },
      {
        type: 'subheading',
        text: 'Grade Five — Impotent Quality',
      },
      {
        type: 'label',
        text: 'Purity: Less than 35%',
        color: 'primary',
      },
      {
        type: 'paragraph',
        text:
          'Stones containing insufficient Type Energy to meet normal standards for evolutionary use. Grade Five stones are generally considered impotent and may be unsuitable for triggering or sustaining a successful evolution.',
      },
    ],
  links: [],
} satisfies Article
