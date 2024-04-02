'use client'

import { customComponents, defaultAnchor } from '@/libs/components'
import { SnackbarProvider } from 'notistack'
import { ReactNode } from 'react'

const NotistackProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SnackbarProvider
      anchorOrigin={defaultAnchor}
      autoHideDuration={1000}
      Components={customComponents}
    >
      {children}
    </SnackbarProvider>
  )
}

export { NotistackProvider }
