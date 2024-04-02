'use client'

import { FormHelperText as MuiFormHelperText, styled } from '@mui/material'

const FormHelperText = styled(MuiFormHelperText)(({ theme }) => ({
  marginLeft: 0,
  fontSize: 15,
  lineHeight: '22px',
  color: theme.palette.red[400],
  marginTop: 6,
}))

export { FormHelperText }
