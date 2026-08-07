import { Input } from '@/components/Input/Input'
import { useTable, type ColumnDef, type RowData, type TableOptions } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import clsx from 'clsx'
import { useCallback, useMemo, useRef, type ReactNode } from 'react'
import styles from './DataTable.module.scss'
import {
  DataTableContext,
  useDataTableContext,
  type DataTableContextValue,
} from './DataTableContext'
import { expandColumnDef } from './expandColumnDef'
import { features, type DataTableFeatures } from './features'
import TablePrimitive from './TablePrimitive'
import type { RenderDetailPanel } from './types'
import { useColumnSizeVars } from './useColumnSizeVars'

interface DataTableRootProps<TData extends RowData, TValue> extends Omit<
  TableOptions<DataTableFeatures, TData>,
  'columns' | 'features'
> {
  columns: (ColumnDef<DataTableFeatures, TData, TValue> | undefined)[]
  data: TData[]
  isLoading?: boolean
  enableVirtualization?: boolean
  renderDetailPanel?: RenderDetailPanel<TData>
  className?: string
  loadingRowsCount?: number
  children?: ReactNode
}

function DataTableRoot<TData extends RowData, TValue>({
  columns: providedColumns,
  isLoading,
  data,
  enableVirtualization,
  renderDetailPanel,
  className,
  loadingRowsCount = 5,
  children,
  ...options
}: DataTableRootProps<TData, TValue>) {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const columns = useMemo<ColumnDef<DataTableFeatures, TData, TValue>[]>(
    () =>
      [
        renderDetailPanel
          ? (expandColumnDef as unknown as ColumnDef<DataTableFeatures, TData, TValue>)
          : undefined,
        ...providedColumns,
      ].filter(
        (column): column is ColumnDef<DataTableFeatures, TData, TValue> => column !== undefined,
      ),
    [providedColumns, renderDetailPanel],
  )

  const table = useTable({
    features,
    columns: columns as unknown as ColumnDef<DataTableFeatures, TData, unknown>[],
    data,
    getRowCanExpand: renderDetailPanel ? () => true : undefined,
    enableColumnResizing: false,
    ...options,
  })

  const rowCount = table.getRowModel().rows.length

  const estimateSize = useCallback(
    (index: number) => {
      if (!renderDetailPanel || index % 2 === 0) return 64
      const row = table.getRowModel().rows[(index - 1) / 2]
      return row?.getIsExpanded() ? 100 : 0
    },
    [renderDetailPanel, table],
  )

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Virtual doesn't support the React Compiler yet
  const rowVirtualizer = useVirtualizer({
    count: isLoading ? loadingRowsCount : renderDetailPanel ? rowCount * 2 : rowCount,
    estimateSize,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    gap: renderDetailPanel ? 5 : 10,
    overscan: 5,
    enabled: enableVirtualization,
  })

  const columnSizeVars = useColumnSizeVars(table)

  const contextValue: DataTableContextValue<TData> = {
    table,
    rowVirtualizer,
    tableContainerRef,
    enableVirtualization,
    renderDetailPanel,
    columnSizeVars,
    isLoading,
    loadingRowsCount,
  }

  return (
    <DataTableContext value={contextValue as DataTableContextValue}>
      <div className={clsx(styles.dataTableWrapper, className)}>{children}</div>
    </DataTableContext>
  )
}

interface DataTableContentProps {
  children?: ReactNode
}

function DataTableContent({ children }: DataTableContentProps) {
  const { tableContainerRef, columnSizeVars, enableVirtualization, renderDetailPanel } =
    useDataTableContext()

  return (
    <div
      className={styles.dataTableContainer}
      ref={tableContainerRef}
      data-virtualized={enableVirtualization}
    >
      <TablePrimitive.Table
        className={styles.table}
        data-expandable={renderDetailPanel !== undefined}
        data-virtualized={enableVirtualization}
        style={{ ...columnSizeVars }}
      >
        {children}
      </TablePrimitive.Table>
    </div>
  )
}

interface DataTableSearchProps {
  placeholder?: string
  className?: string
}

function DataTableSearch({ placeholder, className }: DataTableSearchProps) {
  const { table } = useDataTableContext()
  const { globalFilter } = table.state

  return (
    <Input
      className={clsx(styles.searchInput, className)}
      placeholder={placeholder}
      value={globalFilter ?? ''}
      onInput={(event) => table.setGlobalFilter(event.currentTarget.value || undefined)}
    />
  )
}

export { DataTableBody, type DataTableBodyProps } from './DataTableBody'
export { DataTableHeader } from './DataTableHeader'
export type { RenderDetailPanel } from './types'
export { DataTableContent, DataTableRoot, DataTableSearch }

// eslint-disable-next-line react-refresh/only-export-components
export { selectColumnDef } from './selectColumnDef'
