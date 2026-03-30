export type WorkCategory = 'brand' | 'poster'

export interface WorkItem {
  id: number
  titleEn: string
  titleAr: string
  clientEn: string
  clientAr: string
  year: string
  descEn: string
  descAr: string
  tags: string[]
  category: WorkCategory
  wide?: boolean
  bgClass: string
  color: string
  image?: string
  images?: string[]
  gallery?: string[]
}

export interface Skill {
  nameEn: string
  nameAr: string
  percent: number
}

export interface ExperienceItem {
  dateEn: string
  dateAr: string
  roleEn: string
  roleAr: string
  companyEn: string
  companyAr: string
  pointsEn: string[]
  pointsAr: string[]
}

export interface ClientLogo {
  nameEn: string
  nameAr: string
  color: string
  logo?: string
}

export type Lang = 'en' | 'ar'
