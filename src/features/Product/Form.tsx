'use client'

import { Input, Select } from '@/libs/components'
import request from '@/libs/config/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CategoryListType } from '../category'
import { ProductCreateSchema, ProductCreateType, ProductDetailType } from './type'

const FormProduct = () => {
  const { productId } = useParams()
  const router = useRouter()
  const queryClient = new QueryClient()

  const { data } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data } = await request.get<ProductDetailType>(`/product/${productId}`)
      return data.data
    },
    enabled: !!productId,
  })

  const { data: category } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const { data } = await request.get<CategoryListType>('/category')
      return data.data
    },
  })

  const categoryOptions =
    category?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || []

  const { mutate: updateUser } = useMutation({
    mutationFn: async (data: ProductCreateType) => {
      const response = await request.put(`/product/${productId}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
      router.push('/product')
    },
  })

  const { mutate: createProduct } = useMutation({
    mutationFn: async (data: ProductCreateType) => {
      const response = await request.post('/product', data)
      return response.data
    },
    onSuccess: () => {
      router.push('/product')
    },
  })

  const { handleSubmit, control } = useForm<ProductCreateType>({
    defaultValues: {
      name: '',
      price: '',
      description: '',
      quantity: '',
      image: '',
      categoryId: '',
      cost: '',
    },
    values: data,
    resolver: zodResolver(ProductCreateSchema),
  })

  const onSubmit: SubmitHandler<ProductCreateType> = (data) => {
    if (productId) {
      updateUser(data)
      return
    }

    createProduct(data)
  }

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} width={500}>
      <Input control={control} name="name" label="Tên sản phẩm" placeholder="Nhập tên sản phẩm" />

      <Input
        control={control}
        name="cost"
        label="Giá nhập sản phẩm"
        placeholder="Nhập giá nhập sản phẩm nhập vao"
      />

      <Input
        control={control}
        name="price"
        label="Giá bán sản phẩm"
        placeholder="Nhập giá sản phẩm"
      />

      <Input
        control={control}
        name="description"
        label="Mô tả sản phẩm"
        placeholder="Nhập mô tả sản phẩm"
      />

      <Input
        control={control}
        name="quantity"
        label="Số lượng sản phẩm"
        placeholder="Nhập số lượng sản phẩm"
      />

      <Input
        control={control}
        name="image"
        label="Hình ảnh sản phẩm"
        placeholder="Nhập hình ảnh sản phẩm"
      />

      <Select control={control} name="categoryId" label="Danh mục" options={categoryOptions} />

      <Button type="submit" variant="contained">
        {productId ? 'Cập nhật' : 'Thêm mới'}
      </Button>
    </Stack>
  )
}

export { FormProduct }
