import type { ReactTable, Row, RowData } from '@tanstack/react-table'
import type { ReactElement } from 'react'
import type { DataTableFeatures } from './features'

export type DataTableInstance<TData extends RowData> = ReactTable<DataTableFeatures, TData>

export type RenderDetailPanel<TData extends RowData> = (props: {
  row: Row<DataTableFeatures, TData>
  table: DataTableInstance<TData>
}) => ReactElement
