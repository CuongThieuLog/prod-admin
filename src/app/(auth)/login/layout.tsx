import { loginText } from '@public/locales'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: loginText.title,
  description: loginText.title,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
