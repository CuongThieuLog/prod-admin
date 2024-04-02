'use client'

import { useAuth } from '@/libs/context'
import { CircularProgress, Stack, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const LayoutUnAuth = ({ children }: { children: React.ReactNode }) => {
  const { admin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (admin && !loading) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, loading])

  return loading || admin ? (
    <Stack width="100%" height="100vh" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  ) : (
    <ContentPage>{children}</ContentPage>
  )
}

export { LayoutUnAuth }

const ContentPage = styled('div')(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  paddingLeft: theme.spacing(12.5),
  paddingRight: theme.spacing(12.5),
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))
