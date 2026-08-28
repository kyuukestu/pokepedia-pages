import { AllRegions } from '@/types/region'

export interface RibbonRecord {
  ribbonId: string
  dateObtained?: string
}

export type RibbonCollection = Partial<Record<AllRegions, RibbonRecord[]>>
