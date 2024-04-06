'use client'

import { Modal } from '@/libs/components'
import request from '@/libs/config/axios'
import { base } from '@/libs/config/theme/colors'
import { Box, Button, CircularProgress, Stack, Typography, colors } from '@mui/material'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { CategoryDetailType } from './type'

const CategoryDetail = () => {
  const { categoryId } = useParams()
  const router = useRouter()
  const queryClient = new QueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const { data } = await request.get<CategoryDetailType>(`/category/${categoryId}`)
      return data.data
    },
    enabled: !!categoryId,
  })

  const [openModal, setOpenModal] = useState(false)

  const { mutate: deleteCategory } = useMutation({
    mutationFn: async () => {
      const response = await request.delete(`/category/${categoryId}`)
      return response.data
    },
    onSuccess: () => {
      setOpenModal(false)
      queryClient.invalidateQueries()
      enqueueSnackbar('Xóa danh mục sản phẩm thành công', { variant: 'success' })
      router.push('/category')
    },
    onError: () => {
      enqueueSnackbar('Xóa danh mục sản phẩm không thành công. Vui lòng thử lại sau!', {
        variant: 'error',
      })
    },
  })

  const Category = [
    {
      title: 'Tên danh mục sản phẩm',
      value: data?.name,
    },
    {
      title: 'Mô tả',
      value: data?.description,
    },
  ]

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3.5} mr={2}>
        <Typography variant="h4" fontWeight="bold">
          Chi tiết danh mục sản phẩm
        </Typography>

        <Stack direction="row" spacing={3.5}>
          <Button variant="outlined" onClick={() => router.push('/Category')}>
            Quay lại
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`/Category/update/${categoryId}`)}
          >
            Chỉnh sửa
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.red[800],
            }}
            onClick={() => setOpenModal(true)}
          >
            Xóa
          </Button>
        </Stack>
      </Stack>

      <Box width="100%">
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" height="60vh">
            <CircularProgress sx={{ color: 'base.primary' }} />
          </Stack>
        ) : (
          <Box mt={1.5}>
            {Category.map((item) => (
              <Stack
                borderBottom={`1px solid ${base.gray}`}
                key={item.title}
                direction="row"
                alignItems="center"
                padding="12px 0"
              >
                <Typography variant="body2" width="50%">
                  {item.title}
                </Typography>

                <Typography
                  variant="body1"
                  fontWeight={400}
                  sx={{ wordWrap: 'break-word' }}
                  width="40%"
                >
                  {item.value}
                </Typography>
              </Stack>
            ))}
          </Box>
        )}
      </Box>

      <Modal
        open={openModal}
        handleCloseModal={() => setOpenModal(false)}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa danh mục sản phẩm này không?"
        handleSubmit={deleteCategory}
        textSubmit="Xóa"
        textCancel="Hủy bỏ"
      />
    </>
  )
}

export { CategoryDetail }
