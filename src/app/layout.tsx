import './globals.css'

import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { fontSans, fontSerif } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import Providers from '@/components/providers'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable, fontSerif.variable)}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <main>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div>{children}</div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
