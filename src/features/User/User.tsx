'use client'

import { Input } from '@/libs/components'
import { ReactTable } from '@/libs/components/Table'
import request from '@/libs/config/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
// import CreateIcon from '@public/assets/svgs/add.svg'
// import DetailIcon from '@public/assets/svgs/detail.svg'
// import EditIcon from '@public/assets/svgs/edit.svg'
import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { UserListType, UserSchema, UserSearchType, UserType } from '.'

const User = () => {
  const router = useRouter()

  const columnHelper = createColumnHelper<UserType>()

  const columns = [
    columnHelper.accessor('_id', {
      header: () => 'ID',
    }),
    columnHelper.accessor('username', {
      header: () => 'Tên người dùng',
    }),
    columnHelper.accessor('email', {
      header: () => 'Email',
    }),
    columnHelper.accessor('role', {
      header: () => 'Vai trò',
    }),
    // columnHelper.accessor('_id', {
    //   id: 'action',
    //   header: '',
    //   cell: (info) => (
    //     <Stack direction="row" alignItems="center" spacing={3.5}>
    //       <ButtonDetail onClick={() => router.push(`/product/detail/${info.getValue()}`)}>
    //         <DetailIcon />
    //       </ButtonDetail>

    //       <ButtonEdit onClick={() => router.push(`/product/edit/${info.getValue()}`)}>
    //         <EditIcon />
    //       </ButtonEdit>
    //     </Stack>
    //   ),
    // }),
  ]

  const { control, watch } = useForm<UserSearchType>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(UserSchema),
  })

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      if (!watch('name')) {
        const response = await request.get<UserListType>('/user')
        return response.data.data
      }

      const response = await request.get<UserListType>('/user', {
        params: {
          name: watch('name'),
        },
      })
      return response.data.data
    },
    queryKey: ['user', watch('name')],
  })

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" spacing={2} height={34} mb="3px">
        {/* <ButtonCreate
          variant="outlined"
          startIcon={<CreateIcon />}
          onClick={() => router.push('user/create')}
        >
          Tạo mới
        </ButtonCreate> */}
      </Stack>

      <Stack direction="row" spacing={4} component="form" mb={4}>
        <Stack direction="row" spacing={2}>
          <Input
            control={control}
            name="name"
            label="Tên người dùng"
            controlProps={{ sx: { label: { fontWeight: 500, marginBottom: 0, fontSize: 12 } } }}
            sx={{
              width: 143,
              '& .MuiOutlinedInput-input': {
                fontSize: 12,
                height: 14,
              },
            }}
          />
        </Stack>
      </Stack>

      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />
    </>
  )
}
export { User }
