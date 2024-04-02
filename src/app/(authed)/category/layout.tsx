import { categoryText } from '@public/locales'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: categoryText.title,
  description: categoryText.title,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
