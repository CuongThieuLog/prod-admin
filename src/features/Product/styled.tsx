'use client'

import { Button, styled } from '@mui/material'

const ButtonDetail = styled(Button)({
  backgroundColor: 'transparent',
  padding: 0,
  minWidth: 0,
  '&:hover': {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  '&:focus': {
    backgroundColor: 'transparent',
  },
})

const ButtonEdit = styled(ButtonDetail)({
  borderRadius: '50%',
})

const ButtonExportCSV = styled(Button)(({ theme }) => ({
  width: 124,
  fontSize: 12,
  padding: '8px 0px',
  border: `1px solid ${theme.palette.base.black}`,
  '&:hover': {
    border: `1px solid ${theme.palette.base.black}`,
  },
}))

const ButtonCreate = styled(Button)(({ theme }) => ({
  fontSize: 12,
  padding: '8px 10px 8px 14px',
  border: `1px solid ${theme.palette.base.black}`,
  '&& .MuiButton-startIcon': {
    marginBottom: 3,
  },
  '&:hover': {
    border: `1px solid ${theme.palette.base.black}`,
  },
  '&.MuiButton-root': {
    '&&.MuiButton-iconSizeMedium': {
      marginBottom: 5,
      backgroundColor: theme.palette.base.black,
    },
  },
}))

const ButtonSearch = styled(Button)({
  height: 32,
  lineHeight: 'normal',
  marginTop: '17px !important',
})

export { ButtonCreate, ButtonDetail, ButtonEdit, ButtonExportCSV, ButtonSearch }
