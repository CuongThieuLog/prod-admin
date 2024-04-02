import { AlertColor, Button, Alert as MuiAlert, styled } from '@mui/material'

const colorSeverityMapping: Record<AlertColor, 'red' | 'green'> = {
  success: 'green',
  error: 'red',
  warning: 'red',
  info: 'red',
}

const Alert = styled(MuiAlert)(({ theme, severity = 'success' }) => ({
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  width: '100%',
  border: `1px solid ${theme.palette[colorSeverityMapping[severity]][600]}`,
  '& .MuiAlertTitle-root': {
    color: theme.palette[colorSeverityMapping[severity]][700],
    fontWeight: 600,
    marginBottom: 0,
  },
  '& .MuiAlert-icon': {
    color: theme.palette[colorSeverityMapping[severity]][600],
    opacity: 1,
    padding: 0,
  },
  // Close Button
  '& .MuiAlert-action': {
    padding: theme.spacing(0, 0, 0, 2),
    '& .MuiButtonBase-root': {
      padding: 0,
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiSvgIcon-root': {
        fill: theme.palette[colorSeverityMapping[severity]][600],
      },
    },
  },

  // Description
  '& .MuiTypography-body2': {
    color: theme.palette[colorSeverityMapping[severity]][600],
    marginTop: 4,
  },
  '& .MuiAlert-message': {
    padding: 0,
  },
}))

const ButtonStyle = styled(Button)(() => ({
  marginTop: 12,
  fontSize: 13,
  lineHeight: '18px',
  fontWeight: 400,
  minWidth: '110px',
}))

export { Alert, ButtonStyle }
