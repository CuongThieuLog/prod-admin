import { RowData, TableOptions } from '@tanstack/react-table'

export interface ReactTableProps<TData extends RowData> extends TableOptions<TData> {
  isLoading: boolean
}
