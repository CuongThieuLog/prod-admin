import { productText } from '@public/locales'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: productText.title,
  description: productText.title,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
