import { LayoutUnAuth } from '@/libs/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutUnAuth>{children}</LayoutUnAuth>
}
