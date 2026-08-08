import type { ReactTable, Row, RowData, TableState } from '@tanstack/react-table'
import type { ReactElement } from 'react'
import type { DataTableFeatures } from './features'

export type DataTableSelectedState = Pick<
  TableState<DataTableFeatures>,
  'globalFilter' | 'expanded'
>

export type DataTableInstance<TData extends RowData> = ReactTable<
  DataTableFeatures,
  TData,
  DataTableSelectedState
>

export type RenderDetailPanel<TData extends RowData> = (props: {
  row: Row<DataTableFeatures, TData>
  table: DataTableInstance<TData>
}) => ReactElement
