import { Button, Stack, styled } from '@mui/material'
import PaginationLeftIcon from '@public/assets/svgs/left.svg'
import PaginationRight from '@public/assets/svgs/right.svg'
import React from 'react'

type PaginationPropsType = {
  handleNextPage: () => void
  handlePrevPage: () => void
  disabledPrev?: boolean
  disabledNext?: boolean
}

const Pagination: React.FC<PaginationPropsType> = ({
  handleNextPage,
  handlePrevPage,
  disabledNext,
  disabledPrev,
}) => {
  return (
    <Stack direction="row" mt={3.5} justifyContent="center" spacing={6}>
      <PaginationButton
        onClick={handlePrevPage}
        startIcon={<PaginationLeftIcon />}
        disabled={disabledPrev}
      >
        Trước
      </PaginationButton>

      <PaginationButton
        onClick={handleNextPage}
        endIcon={<PaginationRight />}
        disabled={disabledNext}
      >
        Sau
      </PaginationButton>
    </Stack>
  )
}

export { Pagination }

const PaginationButton = styled(Button)(({ theme }) => ({
  padding: '2px 10px',
  borderRadius: 0,
  minWidth: 0,
  fontSize: 14,
  backgroundColor: theme.palette.base.white,
  color: theme.palette.base.black,
  '&:hover': {
    backgroundColor: theme.palette.base.white,
  },
  '&:focus': {
    backgroundColor: theme.palette.base.white,
  },
}))
