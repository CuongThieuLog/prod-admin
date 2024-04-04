import {
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  styled,
} from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

type StyleListItemButtonType = {
  active?: boolean
}

type ListItemButtonType = {
  menu: {
    title: string
    icon: any
    href: string
    disable?: boolean
  }
}

const ListItemButton: React.FC<ListItemButtonType> = ({ menu }) => {
  const router = useRouter()
  const pathname = usePathname()

  const checkHref = (href: string) => {
    return pathname.split('/')[1] === href.split('/')[1]
  }

  const handleDirection = () => {
    router.push(menu.href)
  }

  return (
    <StyleListItemButton
      active={checkHref(menu.href)}
      onClick={handleDirection}
      disabled={menu.disable}
    >
      <ListItemIcon>
        <menu.icon />
      </ListItemIcon>
      <ListItemText primary={menu.title} />
    </StyleListItemButton>
  )
}

const StyleListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyleListItemButtonType>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.customPrimary[0] : theme.palette.common.white,
  borderRadius: '6px',
  padding: '8px',
  marginBottom: theme.spacing(1),
}))

const ListItemIcon = styled(MuiListItemIcon)({
  minWidth: 20,
  marginRight: '14px',
})

const ListItemText = styled(MuiListItemText)({
  '.MuiListItemText-primary': {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  margin: 0,
})

export { ListItemButton, ListItemIcon, ListItemText }
