import { LayoutAuth } from '@/libs/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutAuth>{children}</LayoutAuth>
}
