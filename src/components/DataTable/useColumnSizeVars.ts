import type { RowData } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { DataTableInstance } from './types'

export function useColumnSizeVars<TData extends RowData>(table: DataTableInstance<TData>) {
  const { columnResizing, columnSizing } = table.state

  return useMemo(() => {
    const headers = table.getFlatHeaders()
    const columnSizes: { [key: string]: number } = {}

    headers.forEach((header) => {
      columnSizes[`--header-${header.id}-size`] = header.getSize()
      columnSizes[`--col-${header.column.id}-size`] = header.column.getSize()
    })

    return columnSizes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnResizing, columnSizing])
}
