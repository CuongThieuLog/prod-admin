'use client'

import { Input } from '@/libs/components'
import { ReactTable } from '@/libs/components/Table'
import request from '@/libs/config/axios'
import { Stack } from '@mui/material'
import CreateIcon from '@public/assets/svgs/add.svg'
import EditIcon from '@public/assets/svgs/edit.svg'
import TrashIcon from '@public/assets/svgs/trash.svg'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CategoryListType, CategorySearchType, CategoryType } from '.'
import { ButtonCreate, ButtonEdit, ButtonSearch } from '../Product/styled'

const Category = () => {
  const router = useRouter()

  const queryClient = new QueryClient()

  const { mutate: deleteCate } = useMutation({
    mutationFn: async (id: string) => {
      const response = await request.delete(`/category/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const columnHelper = createColumnHelper<CategoryType>()

  const columns = [
    columnHelper.accessor('_id', {
      header: () => 'ID',
    }),
    columnHelper.accessor('name', {
      header: () => 'Tên danh mục sản phẩm',
    }),
    columnHelper.accessor('description', {
      header: () => 'Mô tả danh mục sản phẩm',
    }),
    columnHelper.accessor('_id', {
      id: 'action',
      header: '',
      cell: (info) => (
        <Stack direction="row" alignItems="center" spacing={3.5}>
          <ButtonEdit onClick={() => deleteCate(info.getValue())}>
            <TrashIcon />
          </ButtonEdit>
          <ButtonEdit onClick={() => router.push(`/category/update/${info.getValue()}`)}>
            <EditIcon />
          </ButtonEdit>
        </Stack>
      ),
    }),
  ]

  const { control, handleSubmit } = useForm<CategorySearchType>({
    defaultValues: {
      name: '',
    },
  })

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await request.get<CategoryListType>('/category')
      return response.data.data
    },
    queryKey: ['products'],
  })

  const onSubmit: SubmitHandler<CategorySearchType> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" spacing={2} height={34} mb="3px">
        <ButtonCreate
          variant="outlined"
          startIcon={<CreateIcon />}
          onClick={() => router.push('category/create')}
        >
          Tạo mới
        </ButtonCreate>
      </Stack>

      <Stack direction="row" spacing={4} component="form" mb={4} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2}>
          <Input
            control={control}
            name="name"
            label="Tên danh mục sản phẩm"
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

        <ButtonSearch type="submit" variant="contained">
          Tìm kiếm
        </ButtonSearch>
      </Stack>

      <ReactTable columns={columns} data={data || []} isLoading={isLoading} />
    </>
  )
}
export { Category }
