'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { Lang } from '@/types'

interface LangContextValue {
  lang: Lang
  isAR: boolean
  toggle: () => void
  tr: (en: string, ar: string) => string
  dir: 'ltr' | 'rtl'
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  isAR: false,
  toggle: () => {},
  tr: (en) => en,
  dir: 'ltr',
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  const toggle = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'ar' : 'en'
      if (typeof document !== 'undefined') {
        document.documentElement.lang = next
        document.documentElement.dir  = next === 'ar' ? 'rtl' : 'ltr'
        document.body.classList.toggle('lang-ar', next === 'ar')
      }
      return next
    })
  }, [])

  const tr = useCallback((en: string, ar: string): string => {
    return lang === 'ar' ? ar : en
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, isAR: lang === 'ar', toggle, tr, dir: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
