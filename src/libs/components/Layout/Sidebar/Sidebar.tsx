'use client'

import { useAuth } from '@/libs/context'
import { Box, IconButton, List, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import LogoutIcon from '@public/assets/svgs/logout.svg'
import { commonText } from '@public/locales'
import { useState } from 'react'
import { Modal } from '../..'
import { ListItemButton } from './ItemSidebar'
import { useMenuList } from './useMenuList'

const SIDE_BAR_WIDTH = 250

const Sidebar = () => {
  const { menus } = useMenuList()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { admin, loading, handleLogout } = useAuth()
  const { cancel, confirm, content, title } = commonText.modal.logout

  return (
    <Box
      sx={{
        width: SIDE_BAR_WIDTH,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          width: SIDE_BAR_WIDTH,
          height: '100%',
          borderRight: (theme) => `1px solid ${theme.palette.greyScale[300]}`,
        }}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            px: 2,
            py: 3.25,
          }}
          component="nav"
        >
          {menus.map((menu) => (
            <ListItemButton key={menu.title} menu={menu} />
          ))}
        </List>

        <Stack
          left={0}
          pb="4px"
          right={0}
          gap="26px"
          bottom={0}
          height={151}
          alignItems="center"
          position="absolute"
          bgcolor={red[500]}
          justifyContent="center"
        >
          <Stack direction="row">
            <Stack
              direction="row"
              alignItems="center"
              borderRadius="12px"
              padding="14px 10px 14px 14px"
            >
              <Typography
                variant="subtitle1"
                lineHeight="15px"
                color="white"
                textAlign="center"
                width="100%"
                fontWeight={400}
              >
                {admin?.username}
              </Typography>
            </Stack>

            <IconButton sx={{ padding: '20px' }} onClick={handleOpenModal}>
              <LogoutIcon />
            </IconButton>
          </Stack>
          <Typography
            fontSize={9}
            lineHeight="11px"
            fontWeight={500}
            color="base.white"
            textAlign="center"
            px={2}
          >
            {commonText.sidebar.footer}
          </Typography>
        </Stack>

        <Modal
          open={open}
          title={title}
          textSubmit={confirm}
          handleSubmit={handleLogout}
          handleCloseModal={handleCloseModal}
          description={content}
          textCancel={cancel}
          isLoading={loading}
        />
      </Box>
    </Box>
  )
}

export { Sidebar }
