import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, Space_Mono, Tajawal } from 'next/font/google'
import './globals.css'
import { LangProvider } from '@/hooks/useLang'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' })
const dmSans = DM_Sans({ weight: ['300', '400', '500'], subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono', display: 'swap' })
const tajawal = Tajawal({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ahmed Faris — Lead Graphic Designer',
  description: '10+ years crafting powerful visual identities across healthcare, technology, and commercial sectors.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} ${tajawal.variable}`}>
        <LangProvider>
          <NoiseOverlay />
          <CustomCursor />
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
