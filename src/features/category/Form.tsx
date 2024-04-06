'use client'

import { Input } from '@/libs/components'
import request from '@/libs/config/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CategoryCreateSchema, CategoryCreateType, CategoryDetailType } from './type'

const FormCategory = () => {
  const { categoryId } = useParams()
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const { data } = await request.get<CategoryDetailType>(`/category/${categoryId}`)
      return data.data
    },
    enabled: !!categoryId,
  })

  const { mutate: update } = useMutation({
    mutationFn: async (data: CategoryCreateType) => {
      const response = await request.put(`/category/${categoryId}`, data)
      return response.data
    },
    onSuccess: () => {
      router.push('/category')
    },
  })

  const { mutate: create } = useMutation({
    mutationFn: async (data: CategoryCreateType) => {
      const response = await request.post('/category', data)
      return response.data
    },
    onSuccess: () => {
      router.push('/category')
    },
  })

  const { handleSubmit, control } = useForm<CategoryCreateType>({
    defaultValues: {
      name: '',
      description: '',
    },
    values: data,
    resolver: zodResolver(CategoryCreateSchema),
  })

  const onSubmit: SubmitHandler<CategoryCreateType> = (data) => {
    if (categoryId) {
      update(data)
      return
    }

    create(data)
  }

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} width={500}>
      <Input
        control={control}
        name="name"
        label="Tên danh mục phẩm"
        placeholder="Nhập tên danh mục sản phẩm"
      />

      <Input
        control={control}
        name="description"
        label="Mô tả danh mục sản phẩm"
        placeholder="Nhập mô tả danh mục sản phẩm"
      />

      <Button type="submit" variant="contained">
        {categoryId ? 'Cập nhật' : 'Thêm mới'}
      </Button>
    </Stack>
  )
}

export { FormCategory }
