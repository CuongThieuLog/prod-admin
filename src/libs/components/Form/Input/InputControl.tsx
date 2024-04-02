'use client'

import { FormControl, FormControlProps, Typography } from '@mui/material'
import { memo } from 'react'
import type { FieldError } from 'react-hook-form'
import { FormHelperText } from './FormHelperText'
import { FormLabel } from './FormLabel'

export type AddControlProps = {
  helperText?: string | JSX.Element
  label?: string
  fieldError?: FieldError | boolean
}

export type InputControlProps = FormControlProps<'div', AddControlProps>

function RawInputControl({
  fieldError,
  fullWidth,
  label,
  helperText,
  children,
  required,
  ...props
}: InputControlProps) {
  return (
    <FormControl fullWidth={fullWidth} error={!!fieldError} {...props}>
      {label && (
        <FormLabel>
          {required ? (
            <>
              {label}
              <Typography
                ml={0.5}
                variant="body2"
                component="span"
                sx={{ color: 'red !important' }}
              >
                *
              </Typography>
            </>
          ) : (
            label
          )}
        </FormLabel>
      )}

      {children}

      {!!fieldError && (
        <FormHelperText error>
          {typeof fieldError === 'object' ? fieldError.message : fieldError}
        </FormHelperText>
      )}
      {helperText && <FormHelperText error={false}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const InputControl = memo(RawInputControl) as typeof RawInputControl

export { InputControl }
