## [2.0.0] - 2026-08-07

### Changed

- Migrated to `@tanstack/react-table` v9 — `useReactTable` → `useTable`, with a fixed `tableFeatures()` registration (`columnFilteringFeature`, `columnResizingFeature`, `columnSizingFeature`, `columnVisibilityFeature`, `globalFilteringFeature`, `rowExpandingFeature`, `rowSelectionFeature`, `rowSortingFeature`) exported from new `features.ts`
- `Table`/`Row`/`Column`/`ColumnDef` generics now require the `DataTableFeatures` type parameter throughout `DataTableContext.ts`, `types.ts`, `ColumnHeader.tsx`, `DataTableRow.tsx`, `selectColumnDef.tsx`, and `expandColumnDef.tsx`
- `table.getState()` → `table.state` in `DataTable.tsx` and `useColumnSizeVars.ts`
- Removed the `'use no memo'` directive from every file in this component — `@tanstack/react-table` v9 is React Compiler compatible; only the `useVirtualizer` call in `DataTable.tsx` keeps a scoped `react-hooks/incompatible-library` disable, since `@tanstack/react-virtual` is not yet compiler-safe

### Added

- Interactive column resizing — drag handle rendered per header cell in `DataTableHeader.tsx`/`DataTableHeader.module.scss` when `header.column.getCanResize()`; disabled on the fixed-width `select`/`expand` utility columns. Off by default (`enableColumnResizing: false` in `DataTable.tsx`) — pass `enableColumnResizing: true` to opt in

### Fixed

- Header "select all" checkbox in `selectColumnDef.tsx` no longer stays indeterminate once every row is selected — `getIsSomeRowsSelected()` (v9: "at least one selected") replaced with `getIsSomePageRowsSelected() && !getIsAllPageRowsSelected()`
- Row checkbox in `selectColumnDef.tsx` no longer throws `Cannot read properties of undefined (reading 'checked')` on click — v9's `row.getToggleSelectedHandler()` requires a native DOM event (`event.target.checked`) for its new Shift-range-selection support, but our `Checkbox` primitive calls `onCheckedChange` with a plain boolean; replaced with `onCheckedChange={(value) => row.toggleSelected(!!value)}`
- Sorting no longer logs `sortFn 'text' (auto) for column '...' is not registered` — registered `sortFn_alphanumeric`, `sortFn_alphanumericCaseSensitive`, `sortFn_basic`, `sortFn_datetime`, `sortFn_text`, and `sortFn_textCaseSensitive` under their conventional keys in `features.ts`, since v9's `sortFn: 'auto'` type-based resolution only finds registered functions

## [1.0.1] - 2026-06-12

### Fixed

- Added optional chaining on `virtualItems[virtualItems.length - 1]?.index` to guard against empty virtualizer state — `DataTableBody.tsx`

## [1.0.0] - 2026-06-12

### Added

- Initial release
