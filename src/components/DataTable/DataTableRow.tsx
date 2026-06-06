'use no memo'

import { flexRender, type Row } from '@tanstack/react-table'
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual'
import { Fragment, useLayoutEffect, useRef, type RefObject } from 'react'
import { useDataTableContext } from './DataTableContext'
import styles from './DataTableRow.module.scss'
import TablePrimitive from './TablePrimitive'

export interface DataTableRowProps<TData> {
  row: Row<TData>
  enableVirtualization?: boolean
  virtualRow?: VirtualItem
  rowVirtualizer?: Virtualizer<HTMLDivElement, Element>
  rowsRef?: RefObject<Record<string, HTMLTableRowElement | null>>
  ref?: RefObject<HTMLTableRowElement | null>
}

export function DataTableRow<TData>({
  row,
  rowsRef,
  enableVirtualization,
  virtualRow,
  rowVirtualizer,
  ref,
}: DataTableRowProps<TData>) {
  const { table, renderDetailPanel, setDetailPanelHeight } =
    useDataTableContext<TData>()

  const rowIndex = renderDetailPanel ? row.index * 2 : row.index
  const detailPanelIndex = rowIndex + 1
  const detailVirtualItem = rowVirtualizer
    ?.getVirtualItems()
    .find((v) => v.index === detailPanelIndex)

  const isExpanded = row.getIsExpanded()
  const isScrolling = enableVirtualization
    ? rowVirtualizer?.isScrolling
    : undefined
  const detailPanelRef = useRef<HTMLDivElement>(null)
  const detailContentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const panel = detailPanelRef.current
    const content = detailContentRef.current
    if (!panel || !content) return

    const sync = () => {
      const height = content.offsetHeight
      panel.style.setProperty('--detail-panel-height', `${height}px`)
      setDetailPanelHeight?.(row.id, height)
      if (enableVirtualization && rowVirtualizer && row.getIsExpanded()) {
        rowVirtualizer.measure()
      }
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(content)
    return () => observer.disconnect()
  }, [enableVirtualization, rowVirtualizer, setDetailPanelHeight, row])

  useLayoutEffect(() => {
    if (enableVirtualization && rowVirtualizer) {
      rowVirtualizer.measure()
    }
  }, [enableVirtualization, rowVirtualizer, isExpanded])

  return (
    <Fragment>
      <TablePrimitive.TableRow
        className={styles.TableRow}
        data-index={rowIndex}
        data-state={row.getIsSelected() && 'selected'}
        data-virtualized={enableVirtualization}
        data-scrolling={isScrolling}
        ref={(node) => {
          rowVirtualizer?.measureElement(node)
          if (rowsRef) {
            rowsRef.current[row.id] = node
          }
          if (ref) {
            ref.current = node
          }
        }}
        style={{
          transform: virtualRow
            ? `translateY(${virtualRow.start}px)`
            : undefined,
        }}
      >
        {row.getVisibleCells().map((cell) => (
          <TablePrimitive.TableCell
            key={cell.id}
            className={styles.TableCell}
            data-column-id={cell.column.id}
            data-virtualized={enableVirtualization}
            style={{
              flex: enableVirtualization
                ? `var(--col-${cell.column.id}-size)`
                : undefined,
              width: !enableVirtualization ? cell.column.getSize() : undefined,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TablePrimitive.TableCell>
        ))}
      </TablePrimitive.TableRow>

      {renderDetailPanel && row.getCanExpand() && (
        <tr
          className={styles.TableRow}
          data-detail-panel
          data-index={detailPanelIndex}
          data-virtualized={enableVirtualization}
          data-scrolling={isScrolling}
          style={{
            transform: detailVirtualItem
              ? `translateY(${detailVirtualItem.start}px)`
              : undefined,
          }}
        >
          <td
            className={styles.DetailPanelCell}
            data-virtualized={enableVirtualization}
            colSpan={row.getVisibleCells().length}
          >
            <div
              ref={detailPanelRef}
              className={styles.DetailPanel}
              data-expanded={isExpanded}
              role='region'
              inert={!isExpanded}
            >
              <div ref={detailContentRef} className={styles.DetailPanelContent}>
                {renderDetailPanel({ row, table })}
              </div>
            </div>
          </td>
        </tr>
      )}
    </Fragment>
  )
}
