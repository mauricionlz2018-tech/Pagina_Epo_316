import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Chatbot from '@/components/chatbot'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EPO 316 - Escuela Preparatoria Oficial',
  description: 'Escuela Preparatoria Oficial Núm. 316 del Estado de México. Educación de calidad, formación integral y excelencia académica.',
  icons: {
    icon: '/logo_epo.jpg',
    apple: '/logo_epo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={roboto.className} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
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