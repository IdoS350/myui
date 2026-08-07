import type { Meta, StoryObj } from '@storybook/react'
import type { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DataTableContent, DataTableRoot, DataTableSearch, selectColumnDef } from './DataTable'
import { DataTableBody } from './DataTableBody'
import { DataTableHeader } from './DataTableHeader'
import type { DataTableFeatures } from './features'

export default {
  title: 'Data/DataTable',
  component: DataTableRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DataTableRoot>

type Story = StoryObj<typeof DataTableRoot>

interface Employee {
  id: string
  name: string
  role: string
  department: string
  status: 'Active' | 'On leave' | 'Inactive'
  salary: number
}

const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Engineer',
    department: 'Platform',
    status: 'Active',
    salary: 120000,
  },
  {
    id: '2',
    name: 'Bob Martinez',
    role: 'Designer',
    department: 'Product',
    status: 'Active',
    salary: 105000,
  },
  {
    id: '3',
    name: 'Carol Chen',
    role: 'Manager',
    department: 'Engineering',
    status: 'On leave',
    salary: 145000,
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Engineer',
    department: 'Platform',
    status: 'Active',
    salary: 115000,
  },
  {
    id: '5',
    name: 'Eva Rossi',
    role: 'Analyst',
    department: 'Data',
    status: 'Inactive',
    salary: 95000,
  },
  {
    id: '6',
    name: 'Frank Nguyen',
    role: 'Engineer',
    department: 'Security',
    status: 'Active',
    salary: 130000,
  },
  {
    id: '7',
    name: 'Grace Liu',
    role: 'Designer',
    department: 'Product',
    status: 'Active',
    salary: 110000,
  },
  {
    id: '8',
    name: 'Henry Patel',
    role: 'Manager',
    department: 'Data',
    status: 'Active',
    salary: 140000,
  },
]

const STATUS_COLORS: Record<Employee['status'], string> = {
  Active: 'oklch(0.55 0.18 145)',
  'On leave': 'oklch(0.65 0.18 60)',
  Inactive: 'oklch(0.55 0.08 0)',
}

interface Project {
  id: string
  name: string
  status: 'In progress' | 'Completed' | 'Blocked'
  priority: 'High' | 'Medium' | 'Low'
}

const PROJECTS_BY_EMPLOYEE: Record<string, Project[]> = {
  '1': [
    {
      id: 'p1',
      name: 'Platform Migration',
      status: 'In progress',
      priority: 'High',
    },
    {
      id: 'p2',
      name: 'Auth Refactor',
      status: 'Completed',
      priority: 'Medium',
    },
  ],
  '3': [{ id: 'p3', name: 'Q3 Roadmap', status: 'In progress', priority: 'High' }],
  '4': [
    { id: 'p4', name: 'CI Pipeline', status: 'Blocked', priority: 'High' },
    {
      id: 'p5',
      name: 'Load Testing',
      status: 'In progress',
      priority: 'Medium',
    },
    { id: 'p6', name: 'Docs Site', status: 'Completed', priority: 'Low' },
  ],
  '6': [
    { id: 'p7', name: 'Pen Test', status: 'In progress', priority: 'High' },
    { id: 'p8', name: 'SOC2 Audit', status: 'In progress', priority: 'High' },
  ],
  '8': [
    {
      id: 'p9',
      name: 'Data Warehouse',
      status: 'In progress',
      priority: 'High',
    },
    { id: 'p10', name: 'ML Pipeline', status: 'Blocked', priority: 'Medium' },
  ],
}

export const Basic: Story = {
  render: function Basic() {
    const { t } = useTranslation()
    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      {
        accessorKey: 'status',
        header: t('dataTable.status'),
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue<Employee['status']>()
          return <span style={{ color: STATUS_COLORS[status], fontWeight: 500 }}>{status}</span>
        },
      },
      {
        accessorKey: 'salary',
        header: t('dataTable.salary'),
        size: 120,
        cell: ({ getValue }) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(getValue<number>()),
      },
    ]
    return (
      <DataTableRoot columns={baseColumns} data={EMPLOYEES}>
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody />
        </DataTableContent>
      </DataTableRoot>
    )
  },
}

export const WithSorting: Story = {
  render: function WithSorting() {
    const { t } = useTranslation()
    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      {
        accessorKey: 'status',
        header: t('dataTable.status'),
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue<Employee['status']>()
          return <span style={{ color: STATUS_COLORS[status], fontWeight: 500 }}>{status}</span>
        },
      },
      {
        accessorKey: 'salary',
        header: t('dataTable.salary'),
        size: 120,
        cell: ({ getValue }) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(getValue<number>()),
      },
    ]
    const sortableColumns: ColumnDef<DataTableFeatures, Employee>[] = baseColumns.map((col) => ({
      ...col,
      enableSorting: true,
    }))

    return (
      <DataTableRoot columns={sortableColumns} data={EMPLOYEES}>
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody />
        </DataTableContent>
      </DataTableRoot>
    )
  },
}

export const WithSearch: Story = {
  render: function WithSearch() {
    const { t } = useTranslation()
    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      {
        accessorKey: 'status',
        header: t('dataTable.status'),
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue<Employee['status']>()
          return <span style={{ color: STATUS_COLORS[status], fontWeight: 500 }}>{status}</span>
        },
      },
      {
        accessorKey: 'salary',
        header: t('dataTable.salary'),
        size: 120,
        cell: ({ getValue }) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(getValue<number>()),
      },
    ]
    return (
      <DataTableRoot columns={baseColumns} data={EMPLOYEES}>
        <DataTableSearch placeholder={t('dataTable.searchEmployees')} />
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody />
        </DataTableContent>
      </DataTableRoot>
    )
  },
}

export const WithRowSelection: Story = {
  render: function WithRowSelection() {
    const { t } = useTranslation()
    const [rowSelection, setRowSelection] = React.useState({})

    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      {
        accessorKey: 'status',
        header: t('dataTable.status'),
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue<Employee['status']>()
          return <span style={{ color: STATUS_COLORS[status], fontWeight: 500 }}>{status}</span>
        },
      },
      {
        accessorKey: 'salary',
        header: t('dataTable.salary'),
        size: 120,
        cell: ({ getValue }) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(getValue<number>()),
      },
    ]
    const columns: ColumnDef<DataTableFeatures, Employee>[] = [
      selectColumnDef as unknown as ColumnDef<DataTableFeatures, Employee>,
      ...baseColumns,
    ]

    return (
      <DataTableRoot
        columns={columns}
        data={EMPLOYEES}
        enableRowSelection
        state={{ rowSelection }}
        onRowSelectionChange={setRowSelection}
      >
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody />
        </DataTableContent>
      </DataTableRoot>
    )
  },
}

export const WithDetailPanel: Story = {
  render: function WithDetailPanel() {
    const { t } = useTranslation()
    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      {
        accessorKey: 'status',
        header: t('dataTable.status'),
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue<Employee['status']>()
          return <span style={{ color: STATUS_COLORS[status], fontWeight: 500 }}>{status}</span>
        },
      },
      {
        accessorKey: 'salary',
        header: t('dataTable.salary'),
        size: 120,
        cell: ({ getValue }) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(getValue<number>()),
      },
    ]
    return (
      <DataTableRoot
        columns={baseColumns}
        data={EMPLOYEES}
        renderDetailPanel={({ row }) => (
          <div
            style={{
              padding: 'var(--space-4) var(--space-6)',
              display: 'flex',
              gap: 'var(--space-8)',
              fontSize: '0.875rem',
              color: 'var(--color-fg-muted)',
            }}
          >
            <div>
              <strong>{t('dataTable.employeeId')}</strong> {row.original.id}
            </div>
            <div>
              <strong>{t('dataTable.department')}:</strong> {row.original.department}
            </div>
            <div>
              <strong>{t('dataTable.salary')}:</strong>{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(row.original.salary)}
            </div>
          </div>
        )}
      >
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody />
        </DataTableContent>
      </DataTableRoot>
    )
  },
}

export const WithNestedTable: Story = {
  render: function WithNestedTable() {
    const { t } = useTranslation()
    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      {
        accessorKey: 'status',
        header: t('dataTable.status'),
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue<Employee['status']>()
          return <span style={{ color: STATUS_COLORS[status], fontWeight: 500 }}>{status}</span>
        },
      },
      {
        accessorKey: 'salary',
        header: t('dataTable.salary'),
        size: 120,
        cell: ({ getValue }) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(getValue<number>()),
      },
    ]
    const PROJECT_COLUMNS: ColumnDef<DataTableFeatures, Project>[] = [
      { accessorKey: 'name', header: t('dataTable.project'), size: 220 },
      { accessorKey: 'status', header: t('dataTable.status'), size: 130 },
      { accessorKey: 'priority', header: t('dataTable.priority'), size: 100 },
    ]
    return (
      <DataTableRoot
        columns={baseColumns}
        data={EMPLOYEES}
        renderDetailPanel={({ row }) => {
          const projects = PROJECTS_BY_EMPLOYEE[row.original.id]

          if (!projects?.length) {
            return (
              <div
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  fontSize: '0.875rem',
                  color: 'var(--color-fg-muted)',
                }}
              >
                {t('dataTable.noProjectsAssigned')}
              </div>
            )
          }

          return (
            <div
              style={{
                padding: 'var(--space-0) var(--space-6) var(--space-4)',
              }}
            >
              <DataTableRoot columns={PROJECT_COLUMNS} data={projects}>
                <DataTableContent>
                  <DataTableHeader />
                  <DataTableBody />
                </DataTableContent>
              </DataTableRoot>
            </div>
          )
        }}
      >
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody />
        </DataTableContent>
      </DataTableRoot>
    )
  },
}

const LARGE_DATASET: Employee[] = Array.from({ length: 500 }, (_, i) => ({
  id: String(i + 1),
  name: EMPLOYEES[i % EMPLOYEES.length]!.name,
  role: EMPLOYEES[i % EMPLOYEES.length]!.role,
  department: EMPLOYEES[i % EMPLOYEES.length]!.department,
  status: EMPLOYEES[i % EMPLOYEES.length]!.status,
  salary: EMPLOYEES[i % EMPLOYEES.length]!.salary + i * 100,
}))

export const VirtualizedWithNestedTable: Story = {
  render: function VirtualizedWithNestedTable() {
    const { t } = useTranslation()
    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      {
        accessorKey: 'status',
        header: t('dataTable.status'),
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue<Employee['status']>()
          return <span style={{ color: STATUS_COLORS[status], fontWeight: 500 }}>{status}</span>
        },
      },
      {
        accessorKey: 'salary',
        header: t('dataTable.salary'),
        size: 120,
        cell: ({ getValue }) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(getValue<number>()),
      },
    ]
    const PROJECT_COLUMNS: ColumnDef<DataTableFeatures, Project>[] = [
      { accessorKey: 'name', header: t('dataTable.project'), size: 220 },
      { accessorKey: 'status', header: t('dataTable.status'), size: 130 },
      { accessorKey: 'priority', header: t('dataTable.priority'), size: 100 },
    ]
    return (
      <div style={{ height: 500 }}>
        <DataTableRoot
          columns={baseColumns}
          data={LARGE_DATASET}
          enableVirtualization
          renderDetailPanel={({ row }) => {
            const groupId = String(((parseInt(row.original.id) - 1) % 8) + 1)
            const projects = PROJECTS_BY_EMPLOYEE[groupId]

            if (!projects?.length) {
              return (
                <div
                  style={{
                    padding: 'var(--space-3) var(--space-6)',
                    fontSize: '0.875rem',
                    color: 'var(--color-fg-muted)',
                  }}
                >
                  {t('dataTable.noProjectsAssigned')}
                </div>
              )
            }

            return (
              <div
                style={{
                  padding: 'var(--space-0) var(--space-6) var(--space-4)',
                }}
              >
                <DataTableRoot columns={PROJECT_COLUMNS} data={projects}>
                  <DataTableContent>
                    <DataTableHeader />
                    <DataTableBody />
                  </DataTableContent>
                </DataTableRoot>
              </div>
            )
          }}
        >
          <DataTableContent>
            <DataTableHeader />
            <DataTableBody />
          </DataTableContent>
        </DataTableRoot>
      </div>
    )
  },
}

export const Loading: Story = {
  render: function Loading() {
    const { t } = useTranslation()
    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      { accessorKey: 'status', header: t('dataTable.status'), size: 120 },
      { accessorKey: 'salary', header: t('dataTable.salary'), size: 120 },
    ]
    return (
      <DataTableRoot columns={baseColumns} data={[]} isLoading loadingRowsCount={6}>
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody />
        </DataTableContent>
      </DataTableRoot>
    )
  },
}

export const Empty: Story = {
  render: function EmptyStory() {
    const { t } = useTranslation()
    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      { accessorKey: 'status', header: t('dataTable.status'), size: 120 },
      { accessorKey: 'salary', header: t('dataTable.salary'), size: 120 },
    ]
    return (
      <DataTableRoot columns={baseColumns} data={[]}>
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody />
        </DataTableContent>
      </DataTableRoot>
    )
  },
}

export const Virtualized: Story = {
  render: function Virtualized() {
    const { t } = useTranslation()
    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      {
        accessorKey: 'status',
        header: t('dataTable.status'),
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue<Employee['status']>()
          return <span style={{ color: STATUS_COLORS[status], fontWeight: 500 }}>{status}</span>
        },
      },
      {
        accessorKey: 'salary',
        header: t('dataTable.salary'),
        size: 120,
        cell: ({ getValue }) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(getValue<number>()),
      },
    ]
    return (
      <div style={{ height: 400 }}>
        <DataTableRoot columns={baseColumns} data={LARGE_DATASET} enableVirtualization>
          <DataTableContent>
            <DataTableHeader />
            <DataTableBody />
          </DataTableContent>
        </DataTableRoot>
      </div>
    )
  },
}

export const AllFeatures: Story = {
  render: function AllFeatures() {
    const { t } = useTranslation()
    const [rowSelection, setRowSelection] = React.useState({})

    const baseColumns: ColumnDef<DataTableFeatures, Employee>[] = [
      { accessorKey: 'name', header: t('dataTable.name'), size: 200 },
      { accessorKey: 'role', header: t('dataTable.role'), size: 150 },
      {
        accessorKey: 'department',
        header: t('dataTable.department'),
        size: 160,
      },
      {
        accessorKey: 'status',
        header: t('dataTable.status'),
        size: 120,
        cell: ({ getValue }) => {
          const status = getValue<Employee['status']>()
          return <span style={{ color: STATUS_COLORS[status], fontWeight: 500 }}>{status}</span>
        },
      },
      {
        accessorKey: 'salary',
        header: t('dataTable.salary'),
        size: 120,
        cell: ({ getValue }) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(getValue<number>()),
      },
    ]
    const columns: ColumnDef<DataTableFeatures, Employee>[] = [
      selectColumnDef as unknown as ColumnDef<DataTableFeatures, Employee>,
      ...baseColumns.map((col) => ({ ...col, enableSorting: true })),
    ]

    return (
      <DataTableRoot
        columns={columns}
        data={EMPLOYEES}
        enableRowSelection
        state={{ rowSelection }}
        onRowSelectionChange={setRowSelection}
        renderDetailPanel={({ row }) => (
          <div
            style={{
              padding: 'var(--space-4) var(--space-6)',
              fontSize: '0.875rem',
              color: 'var(--color-fg-muted)',
            }}
          >
            {t('dataTable.employeeDetail', {
              id: row.original.id,
              department: row.original.department,
            })}
          </div>
        )}
      >
        <DataTableSearch placeholder={t('dataTable.searchAll')} />
        <DataTableContent>
          <DataTableHeader />
          <DataTableBody />
        </DataTableContent>
      </DataTableRoot>
    )
  },
}
