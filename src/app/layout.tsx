import type { Metadata } from 'next'
import './globals.css'
// eslint-disable-next-line camelcase
import { Inter, Poppins, Open_Sans } from 'next/font/google'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { GlobalInfoButton } from '@/components/informative-button'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  style: ['italic', 'normal'],
  weight: ['400', '700', '900'],
  preload: true,
})

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-openSans',
  style: ['italic', 'normal'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Megazord - The Woodie Flowers Box',
  description: 'Um mecanismo de ensino acessível de STEAM',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="pt-br"
      className={`${inter.variable} ${poppins.variable} ${openSans.variable}`}
    >
      <Analytics />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <Navbar />
          </header>

          {children}
          <GlobalInfoButton />
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}
