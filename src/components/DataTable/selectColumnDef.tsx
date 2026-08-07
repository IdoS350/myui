import { Checkbox } from '@/components/Checkbox/Checkbox'
import type { ColumnDef } from '@tanstack/react-table'
import type { DataTableFeatures } from './features'

export const selectColumnDef: ColumnDef<DataTableFeatures, Record<string, unknown>> = {
  id: 'select',
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label='Select all'
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label='Select row'
    />
  ),
  size: 10,
  minSize: 10,
  enableResizing: false,
} as const
