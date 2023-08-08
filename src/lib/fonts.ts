import { Inter, Roboto_Mono, Roboto_Serif } from 'next/font/google'

export const fontSans = Inter({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-inter',
})

export const fontSerif = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto-serif',
})

export const fontMono = Roboto_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto-mono',
})
