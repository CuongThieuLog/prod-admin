'use client'

import { Input } from '@/libs/components'
import { ReactTable } from '@/libs/components/Table'
import request from '@/libs/config/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import DetailIcon from '@public/assets/svgs/detail.svg'
import { useQuery } from '@tanstack/react-query'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { OrderListType, ProductBaseType, ProductSchema, ProductSearchType } from '../Product'
import { ButtonEdit } from '../Product/styled'
import { STATUS_COLOR, STATUS_OPTIONS } from './Detail'

const Order = () => {
  const router = useRouter()

  const columnHelper = createColumnHelper<ProductBaseType>()

  const mapperStatus = (
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED',
  ) => {
    const label = STATUS_OPTIONS.find((item) => item.value === status)?.label
    const color = STATUS_COLOR[status]

    return { label, color }
  }

  const columns = [
    columnHelper.accessor('_id', {
      header: () => 'ID',
    }),
    columnHelper.accessor('status', {
      header: () => 'Trạng thái',
      cell: (info) => {
        const status = info.row.original.status
        const { label, color } = mapperStatus(
          status as 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED',
        )
        return (
          <Stack direction="row" alignItems="center" spacing={1}>
            <span
              style={{
                padding: '4px 8px',
                borderRadius: 4,
                color: 'white',
                backgroundColor: color,
              }}
            >
              {label}
            </span>
          </Stack>
        )
      },
    }),
    columnHelper.accessor('shippingAddress', {
      header: () => 'Địa chỉ giao hàng',
    }),
    columnHelper.accessor('total', {
      header: () => 'Tổng tiền',
    }),
    columnHelper.accessor('_id', {
      id: 'action',
      header: '',
      cell: (info) => (
        <Stack direction="row" alignItems="center" spacing={3.5}>
          <ButtonEdit onClick={() => router.push(`/order/${info.getValue()}`)}>
            <DetailIcon />
          </ButtonEdit>
        </Stack>
      ),
    }),
  ]

  const { control, watch } = useForm<ProductSearchType>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(ProductSchema),
  })

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      if (!watch('name')) {
        const response = await request.get<OrderListType>('/order')
        return response.data.data
      }

      const response = await request.get<OrderListType>('/order')
      return response.data.data
    },
    queryKey: ['order', watch('name')],
  })

  return (
    <>
      <Stack direction="row" spacing={4} component="form" mb={4}>
        <Stack direction="row" spacing={2}>
          <Input
            control={control}
            name="name"
            label="Tên đơn hàng"
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
export { Order }
