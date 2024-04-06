'use client'

import request from '@/libs/config/axios'
import { Box, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { IncomeType, ProfitType } from './type'

const Dashboard = () => {
  const { data: income } = useQuery({
    queryKey: ['income'],
    queryFn: async () => {
      const response = await request.get<IncomeType>('/order/income')
      return response.data
    },
  })

  const { data: profit } = useQuery({
    queryKey: ['profit'],
    queryFn: async () => {
      const response = await request.get<ProfitType>('/order/profit')
      return response.data
    },
  })

  return (
    <Box>
      <Typography variant="h4" mb={3} fontWeight="bold">
        Dashboard
      </Typography>

      <Stack direction="row" spacing={2}>
        <Stack
          width={320}
          height={120}
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: 'rgba(53, 162, 235, 0.8)',
            border: '2px solid rgb(53, 162, 235)',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          <Typography textAlign="center">Doanh thu</Typography>

          <Typography textAlign="center" variant="subtitle1">
            {income?.totalProfit}
          </Typography>
        </Stack>

        <Stack
          width={320}
          height={120}
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            border: '2px solid rgb(255, 99, 132)',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          <Typography textAlign="center">Lợi nhuận</Typography>

          <Typography textAlign="center" variant="subtitle1">
            {profit?.totalRevenue}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export { Dashboard }
