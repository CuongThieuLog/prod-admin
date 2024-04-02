'use client'

import { FormControlProps, OutlinedInput, OutlinedInputProps, styled } from '@mui/material'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { AddControlProps } from './InputControl'
import { InputControl } from './InputControl'

export type BaseInputProps<T extends FieldValues> = UseControllerProps<T> &
  AddControlProps & {
    controlProps?: FormControlProps
  }

export type InputProps<T extends FieldValues> = BaseInputProps<T> & OutlinedInputProps

function Input<T extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  required,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      required={required}
      helperText={helperText}
      {...controlProps}
    >
      <InputStyled {...inputProps} {...props} inputRef={ref} />
    </InputControl>
  )
}

const InputStyled = styled(OutlinedInput)(({ theme }) => ({
  '&.MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.blue[300],
    },
  },
  '&&:hover fieldset': {
    borderColor: `${theme.palette.blue[400]}`,
  },
  borderRadius: theme.spacing(0.5),
  color: theme.palette.common.black,
  fontWeight: 400,
  gap: 8,
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1, 1.5),
    fontSize: 15,
    lineHeight: '22px',
    '&::placeholder': {
      color: theme.palette.greyScale[500],
    },
  },

  '&.Mui-error': {
    '&&:hover fieldset': {
      borderColor: theme.palette.status['error'],
    },
    '&&.Mui-focused fieldset': {
      border: `1px solid ${theme.palette.status['error']}`,
    },
  },
}))

export { Input, InputStyled }
