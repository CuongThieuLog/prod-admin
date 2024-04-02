import { orderText } from '@public/locales'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: orderText.title,
  description: orderText.title,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
