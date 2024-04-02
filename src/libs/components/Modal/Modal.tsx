'use client'

import { Modal as MuiModal, Stack, Typography } from '@mui/material'
import React from 'react'
import { BoxContainer, ButtonConfirm, ButtonModal } from './styled'

type ModalProps = {
  open: boolean
  handleCloseModal: () => void
  handleSubmit: () => void
  isLoading?: boolean
  title: string
  description?: string
  textSubmit: string
  textCancel?: string
}

const Modal: React.FC<ModalProps> = ({
  open,
  handleCloseModal,
  handleSubmit,
  isLoading = false,
  title,
  textSubmit,
  description,
  textCancel,
}: ModalProps) => {
  return (
    <MuiModal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
    >
      <BoxContainer>
        <Stack alignItems="center" spacing={5}>
          <Stack spacing={4} textAlign="center">
            <Typography variant="h3" color="mono.500" whiteSpace="wrap">
              {title}
            </Typography>

            <Typography
              variant="body2"
              fontWeight={400}
              color="mono.500"
              width="100%"
              sx={{ wordBreak: 'break-word' }}
            >
              {description}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="center" width="100%" spacing={2}>
            <ButtonModal variant="outlined" disabled={isLoading} onClick={handleCloseModal}>
              {textCancel ? textCancel : 'Cancel'}
            </ButtonModal>

            <ButtonConfirm variant="contained" disabled={isLoading} onClick={handleSubmit}>
              {textSubmit}
            </ButtonConfirm>
          </Stack>
        </Stack>
      </BoxContainer>
    </MuiModal>
  )
}

export { Modal }
