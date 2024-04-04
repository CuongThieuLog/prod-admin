'use client'

import {
  FormControlProps,
  MenuItem,
  Select as MuiSelect,
  SelectProps as RawSelectProps,
  SxProps,
  styled,
} from '@mui/material'
import ArrowDownIcon from '@public/assets/svgs/arrow-down.svg'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { AddControlProps, InputControl } from '../Input/InputControl'

type SelectOption = {
  label: string
  value: unknown
}

type SelectProps<T extends FieldValues> = UseControllerProps<T> &
  RawSelectProps &
  AddControlProps & {
    controlProps?: FormControlProps
    options?: SelectOption[]
    inputSx?: SxProps
    selectSx?: SxProps
    fullWidth?: boolean
  }

function Select<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  options = [],
  helperText,
  controlProps,
  required,
  inputSx,
  fullWidth,
  selectSx,
  ...props
}: SelectProps<T>) {
  const {
    field: { ref, value, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })
  return (
    <InputControl
      fieldError={error}
      label={label}
      helperText={helperText}
      required={required}
      fullWidth={fullWidth}
      {...controlProps}
    >
      <RawSelect
        value={value}
        ref={ref}
        IconComponent={(prop) => <ArrowDownIcon {...prop} />}
        {...inputProps}
        {...props}
      >
        {options.map((option: SelectOption) => (
          <MenuItem
            key={`${option.value}`}
            value={option.value as string}
            sx={{ minHeight: '36px !important' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </RawSelect>
    </InputControl>
  )
}

export { Select }

const RawSelect = styled(MuiSelect)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.common.black,
  '& .MuiOutlinedInput-input': {
    borderRadius: 5,
    border: `1px solid ${theme.palette.base.gray}`,
    fontWeight: 400,
    padding: '8px 12px',
    '&::placeholder': {
      color: theme.palette.base.black,
    },
  },
  '&.MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      border: `1px solid ${theme.palette.base.gray}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.base.gray}`,
    },
  },

  '& .MuiSelect-icon': {
    right: 21,
    top: 17.5,
  },
}))
