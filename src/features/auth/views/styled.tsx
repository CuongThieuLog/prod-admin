'use client'

import { Typography, styled } from '@mui/material'

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
  fontWeight: 700,
  textTransform: 'uppercase',
  marginBottom: 24,
  [theme.breakpoints.down('sm')]: {
    fontWeight: 600,
    fontSize: 19,
    lineHeight: '26px',
    marginBottom: 16,
  },
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  marginBottom: 4,
  [theme.breakpoints.down('sm')]: {
    marginBottom: 8,
    fontSize: 19,
    lineHeight: '26px',
    fontWeight: 700,
  },
}))

const DescriptionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.greyScale[600],
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: 15,
    lineHeight: '22px',
  },
}))

export { DescriptionTitle, SubTitle, Title }
