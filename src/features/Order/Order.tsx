'use client'

import { Input } from '@/libs/components'
import { ReactTable } from '@/libs/components/Table'
import request from '@/libs/config/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import CreateIcon from '@public/assets/svgs/add.svg'
import EditIcon from '@public/assets/svgs/edit.svg'
import TrashIcon from '@public/assets/svgs/trash.svg'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProductListType, ProductSchema, ProductSearchType, ProductType } from '../Product'
import { ButtonCreate, ButtonEdit, ButtonSearch } from '../Product/styled'

const Order = () => {
  const router = useRouter()

  const queryClient = new QueryClient()

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      const response = await request.delete(`/product/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const columnHelper = createColumnHelper<ProductType>()

  const columns = [
    columnHelper.accessor('_id', {
      header: () => 'ID',
    }),
    columnHelper.accessor('name', {
      header: () => 'Tên sản phẩm',
    }),
    columnHelper.accessor('price', {
      header: () => 'Giá sản phẩm',
    }),
    columnHelper.accessor('description', {
      header: () => 'Mô tả sản phẩm',
    }),
    columnHelper.accessor('image', {
      header: () => 'Hình ảnh sản phẩm',
      cell: (info) => <img src={info.row.original.image} alt="product" width={50} height={50} />,
    }),
    columnHelper.accessor('_id', {
      id: 'action',
      header: '',
      cell: (info) => (
        <Stack direction="row" alignItems="center" spacing={3.5}>
          <ButtonEdit
            onClick={() => {
              deleteProduct(info.getValue())
            }}
          >
            <TrashIcon />
          </ButtonEdit>

          <ButtonEdit onClick={() => router.push(`/product/update/${info.getValue()}`)}>
            <EditIcon />
          </ButtonEdit>
        </Stack>
      ),
    }),
  ]

  const { control, handleSubmit, watch } = useForm<ProductSearchType>({
    defaultValues: {
      name: '',
      price: '',
    },
    resolver: zodResolver(ProductSchema),
  })

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await request.get<ProductListType>('/orders')
      return response.data.data
    },
    queryKey: ['products'],
  })

  const onSubmit: SubmitHandler<ProductSearchType> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" spacing={2} height={34} mb="3px">
        <ButtonCreate
          variant="outlined"
          startIcon={<CreateIcon />}
          onClick={() => router.push('/product/create')}
        >
          Tạo mới
        </ButtonCreate>
      </Stack>

      <Stack direction="row" spacing={4} component="form" mb={4} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2}>
          <Input
            control={control}
            name="name"
            label="Tên sản phẩm"
            controlProps={{ sx: { label: { fontWeight: 500, marginBottom: 0, fontSize: 12 } } }}
            sx={{
              width: 143,
              '& .MuiOutlinedInput-input': {
                fontSize: 12,
                height: 14,
              },
            }}
          />

          <Input
            control={control}
            name="price"
            label="Giá sản phẩm"
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
export { Order }
