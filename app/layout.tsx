import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Chatbot from '@/components/chatbot'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}
