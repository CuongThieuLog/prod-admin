'use client'

import { FormLabel as MuiFormLabel, styled } from '@mui/material'

const FormLabel = styled(MuiFormLabel)(({ theme }) => ({
  '&.Mui-error': {
    color: theme.palette.greyScale[900],
  },
  color: theme.palette.greyScale[900],
  marginBottom: '6px',
  fontWeight: 400,
  fontSize: 15,
  lineHeight: '22px',
}))

export { FormLabel }
