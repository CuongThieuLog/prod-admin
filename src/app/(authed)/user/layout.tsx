import { userText } from '@public/locales'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: userText.title,
  description: userText.title,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
