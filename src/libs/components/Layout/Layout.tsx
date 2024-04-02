'use client'

import { useAuth } from '@/libs/context'
import { Box, BoxProps, CircularProgress, Stack, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Sidebar } from './Sidebar'

type LayoutType = BoxProps<
  'div',
  {
    title?: string | null
    description?: string
    children: React.ReactNode
    HeaderComponent?: React.ReactNode
    disableSidebar?: boolean
  }
>

const LayoutAuth: React.FC<LayoutType> = ({
  title,
  description,
  children,
  HeaderComponent,
  disableSidebar = false,
  ...contentProps
}) => {
  const { admin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!admin && !loading) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, loading])

  if (loading || !admin)
    return (
      <Stack width="100%" height="100vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    )

  return (
    <Stack direction="row">
      {!disableSidebar && <Sidebar />}
      <ContentPage {...contentProps}>{children}</ContentPage>
    </Stack>
  )
}

export { LayoutAuth }

const ContentPage = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  padding: theme.spacing(3, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))
