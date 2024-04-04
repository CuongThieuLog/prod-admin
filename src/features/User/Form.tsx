'use client'

import { Input } from '@/libs/components'
import request from '@/libs/config/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProductCreateSchema, ProductCreateType } from './type'

const UserForm = () => {
  const { userId } = useParams()
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await request.get(`/user/${userId}`)
      return data
    },
  })

  const { mutate: updateUser } = useMutation({
    mutationFn: async (data: ProductCreateType) => {
      const response = await request.put(`/user/${userId}`, data)
      return response.data
    },
    onSuccess: () => {
      router.push('/user')
    },
  })

  const { mutate: createUser } = useMutation({
    mutationFn: async (data: ProductCreateType) => {
      const response = await request.post('/user', data)
      return response.data
    },
    onSuccess: () => {
      router.push('/user')
    },
  })

  const { handleSubmit, control } = useForm<ProductCreateType>({
    defaultValues: {
      name: '',
      price: '',
      description: '',
      quantity: 0,
      image: '',
    },
    resolver: zodResolver(ProductCreateSchema),
  })

  const onSubmit: SubmitHandler<ProductCreateType> = (data) => {
    if (userId) {
      updateUser(data)
    } else {
      createUser(data)
    }
  }

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} width={500}>
      <Input control={control} name="name" label="Tên sản phẩm" placeholder="Nhập tên sản phẩm" />

      <Input control={control} name="price" label="Giá sản phẩm" placeholder="Nhập giá sản phẩm" />

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

      <Button type="submit" variant="contained">
        Tạo mới
      </Button>
    </Stack>
  )
}

export { UserForm }
