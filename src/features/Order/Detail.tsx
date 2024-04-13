'use client'

import { Select } from '@/libs/components'
import request from '@/libs/config/axios'
import { base } from '@/libs/config/theme/colors'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { OrderDetailType } from '../Product'
import { OrderBaseType, OrderSchema } from './type'

export const STATUS_OPTIONS = [
  {
    value: 'PENDING',
    label: 'Chờ xác nhận',
  },
  {
    value: 'PROCESSING',
    label: 'Đang xử lý',
  },
  {
    value: 'SHIPPED',
    label: 'Đã giao hàng',
  },
  {
    value: 'DELIVERED',
    label: 'Đã nhận hàng',
  },
  {
    value: 'CANCELED',
    label: 'Đã hủy',
  },
]

export const STATUS_COLOR = {
  PENDING: 'orange',
  PROCESSING: 'blue',
  SHIPPED: 'green',
  DELIVERED: 'purple',
  CANCELED: 'red',
}

const OrderDetail = () => {
  const { orderId } = useParams()
  const router = useRouter()
  const queryClient = new QueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const { data } = await request.get<OrderDetailType>(`/order/${orderId}`)
      return data.order
    },
    enabled: !!orderId,
  })

  const { control, setValue } = useForm<OrderBaseType>({
    defaultValues: {
      status: data?.status || 'PENDING',
    },
    values: {
      status: data?.status || 'PENDING',
    },
    resolver: zodResolver(OrderSchema),
  })

  const mutate = useMutation({
    mutationFn: async (values: OrderBaseType) => {
      await request.put(`/order/update-status/${orderId}`, {
        status: values.status,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
      enqueueSnackbar('Cập nhật trạng thái đơn hàng thành công', {
        variant: 'success',
      })
    },
    onError: () => {
      enqueueSnackbar('Cập nhật trạng thái đơn hàng thất bại', {
        variant: 'error',
      })
    },
  })

  const onChangeStatus = (e: any) => {
    setValue('status', e.target.value)
    mutate.mutate({ status: e.target.value })
  }

  console.log(data?.products)

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3.5} mr={2}>
        <Typography variant="h4" fontWeight="bold">
          Chi tiết đơn hàng
        </Typography>

        <Stack direction="row" spacing={3.5}>
          <Button variant="outlined" onClick={() => router.push('/order')}>
            Quay lại
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
            <Stack
              borderBottom={`1px solid ${base.gray}`}
              direction="row"
              alignItems="center"
              padding="12px 0"
            >
              <Typography variant="body2" width="50%">
                Mã đơn hàng
              </Typography>

              <Typography
                variant="body1"
                fontWeight={400}
                sx={{ wordWrap: 'break-word' }}
                width="40%"
              >
                {data?._id}
              </Typography>
            </Stack>

            <Stack
              borderBottom={`1px solid ${base.gray}`}
              direction="row"
              alignItems="center"
              padding="12px 0"
            >
              <Typography variant="body2" width="50%">
                Tổng tiền
              </Typography>

              <Typography variant="body1" fontWeight={400} width="40%">
                {data?.total}
              </Typography>
            </Stack>

            <Stack
              borderBottom={`1px solid ${base.gray}`}
              direction="row"
              alignItems="center"
              padding="12px 0"
            >
              <Typography variant="body2" width="50%">
                Địa chỉ giao hàng
              </Typography>

              <Typography variant="body1" fontWeight={400} width="40%">
                {data?.shippingAddress}
              </Typography>
            </Stack>

            <Stack
              borderBottom={`1px solid ${base.gray}`}
              direction="row"
              alignItems="center"
              padding="12px 0"
            >
              <Typography variant="body2" width="50%">
                Trạng thái
              </Typography>

              <Typography variant="body1" fontWeight={400} width="40%">
                <Select
                  control={control}
                  name="status"
                  options={STATUS_OPTIONS}
                  onChange={onChangeStatus}
                  controlProps={{
                    sx: {
                      width: 200,
                    },
                  }}
                />
              </Typography>
            </Stack>

            <Stack
              borderBottom={`1px solid ${base.gray}`}
              direction="row"
              alignItems="center"
              padding="12px 0"
            >
              <Typography variant="body2" width="50%">
                Số lượng
              </Typography>

              <Typography variant="body1" fontWeight={400} width="40%">
                {data?.products.map((product) => product.quantity).reduce((a, b) => a + b, 0)}
              </Typography>
            </Stack>

            <Stack
              borderBottom={`1px solid ${base.gray}`}
              direction="row"
              alignItems="center"
              padding="12px 0"
            >
              <Typography variant="body2" width="50%">
                Sản phẩm
              </Typography>

              <Typography variant="body1" fontWeight={400} width="40%">
                {data?.products &&
                  data?.products.map((product) => (
                    <Box key={product._id}>
                      <Typography variant="body1" fontWeight={400} width="40%">
                        {product.product.name}
                      </Typography>
                    </Box>
                  ))}
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  )
}

export { OrderDetail }
