export interface RibbonRegistry {
  id: string // 'hoenn-cool-normal'
  name: string // 'Cool Ribbon'
  city: string // 'Slateport City'
  region: string // 'hoenn'
  category?: 'cool' | 'beauty' | 'cute' | 'smart' | 'tough'
  rank?: 'normal' | 'super' | 'hyper' | 'master'
  image: string // 'cool-ribbon.png'
}
