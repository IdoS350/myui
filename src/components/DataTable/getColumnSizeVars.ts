import type { RowData } from '@tanstack/react-table'
import type { DataTableInstance } from './types'

export function getColumnSizeVars<TData extends RowData>(table: DataTableInstance<TData>) {
  const headers = table.getFlatHeaders()
  const columnSizes: { [key: string]: number } = {}

  headers.forEach((header) => {
    columnSizes[`--header-${header.id}-size`] = header.getSize()
    columnSizes[`--col-${header.column.id}-size`] = header.column.getSize()
  })

  return columnSizes
}
