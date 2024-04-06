'use client'

import { Modal } from '@/libs/components'
import request from '@/libs/config/axios'
import { base } from '@/libs/config/theme/colors'
import { Box, Button, CircularProgress, Stack, Typography, colors } from '@mui/material'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { ProductDetailType } from './type'

const ProductDetail = () => {
  const { productId } = useParams()
  const router = useRouter()
  const queryClient = new QueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data } = await request.get<ProductDetailType>(`/product/${productId}`)
      return data.data
    },
    enabled: !!productId,
  })

  const [openModal, setOpenModal] = useState(false)

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async () => {
      const response = await request.delete(`/product/${productId}`)
      return response.data
    },
    onSuccess: () => {
      setOpenModal(false)
      queryClient.invalidateQueries()
      enqueueSnackbar('Xóa sản phẩm thành công', { variant: 'success' })
      router.push('/product')
    },
    onError: () => {
      enqueueSnackbar('Xóa sản phẩm không thành công. Vui lòng thử lại sau!', {
        variant: 'error',
      })
    },
  })

  const Product = [
    {
      title: 'Tên sản phẩm',
      value: data?.name,
    },
    {
      title: 'Mô tả',
      value: data?.description,
    },
    {
      title: 'Giá',
      value: data?.price,
    },
    {
      title: 'Hình ảnh',
      value: <img src={data?.image} alt="product" width={50} height={50} />,
    },
    {
      title: 'Danh mục',
      value: data?.categoryId,
    },
  ]

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3.5} mr={2}>
        <Typography variant="h4" fontWeight="bold">
          Chi tiết sản phẩm
        </Typography>

        <Stack direction="row" spacing={3.5}>
          <Button variant="outlined" onClick={() => router.push('/product')}>
            Quay lại
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`/product/update/${productId}`)}
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
            {Product.map((item) => (
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
        description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
        handleSubmit={deleteProduct}
        textSubmit="Xóa"
        textCancel="Hủy bỏ"
      />
    </>
  )
}

export { ProductDetail }
