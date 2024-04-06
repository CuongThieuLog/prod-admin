'use client'

import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { RowData } from '@tanstack/table-core'
import { Fragment, ReactElement, useState } from 'react'
import { Pagination } from './Pagination'
import { TableSkeleton } from './TableSkeleton'
import { ReactTableProps } from './types'

function ReactTable<T extends RowData>(
  props: Omit<ReactTableProps<T>, 'getCoreRowModel'>,
): ReactElement {
  const { columns, data, isLoading } = props

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const instance = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  })

  if (isLoading && !data.length) {
    return <TableSkeleton />
  }

  if (data.length === 0)
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" height="60vh">
        <Typography>Không có dữ liệu</Typography>
      </Stack>
    )

  const handleNextPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))
  }

  const handlePrevPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))
  }

  const disabledPrev = pagination.pageIndex === 0
  const disabledNext = pagination.pageIndex === instance.getPageCount() - 1

  return (
    <Box mr={2}>
      <Table>
        <TableHead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  <Typography variant="caption" fontWeight={700} width={100} textAlign="center">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {instance.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <TableRow>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      sx={{
                        fontSize: 14,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )
                })}
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>

      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        disabledNext={disabledNext}
        disabledPrev={disabledPrev}
      />
    </Box>
  )
}

export { ReactTable }
