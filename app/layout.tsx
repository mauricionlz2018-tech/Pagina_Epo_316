import React from "react"
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import Chatbot from '@/components/chatbot'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'EPO 316 - Escuela Preparatoria Oficial',
  description: 'Escuela Preparatoria Oficial Núm. 316 del Estado de México. Educación de calidad, formación integral y excelencia académica.',
  generator: 'v0.app',
  icons: {
    icon: '/logo_epo.jpg',
    apple: '/logo_epo.jpg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Chatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}