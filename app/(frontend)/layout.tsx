import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Cormorant_Garamond, Montserrat, Pinyon_Script } from 'next/font/google'
import '../../styles.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})
const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pinyon',
})

export const metadata: Metadata = {
  title: "D'Harmony Coffee Beans and Roastery",
  description: "Specialty coffee roasted to perfection. Sip the Balance, Taste the Harmony.",
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${montserrat.variable} ${pinyon.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
