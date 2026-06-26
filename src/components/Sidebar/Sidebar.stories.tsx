import type { Meta, StoryObj } from '@storybook/react'
import {
  Calendar,
  ChevronRight,
  Home,
  Inbox,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  User,
} from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button/Button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from './Sidebar'

export default {
  title: 'Navigation/Sidebar',
  component: SidebarProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SidebarProvider>

type Story = StoryObj<typeof SidebarProvider>

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
  padding: 'var(--space-3) var(--space-4)',
  borderBlockEnd: '1px solid var(--color-border)',
}

const pageBodyStyle: React.CSSProperties = {
  padding: 'var(--space-6)',
}

const descriptionStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-fg-muted)',
  maxWidth: '32rem',
}

function DemoPage({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  return (
    <SidebarInset>
      <header style={headerStyle}>
        <SidebarTrigger />
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-fg-muted)' }}>
          {t('sidebar.pageTitle')}
        </span>
      </header>
      <div style={pageBodyStyle}>{children}</div>
    </SidebarInset>
  )
}

export const Default: Story = {
  render: function DefaultSidebar() {
    const { t } = useTranslation()
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size='lg'>
                  <Home />
                  <span>{t('sidebar.appName')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarInput
              placeholder={t('common.search')}
              startSlot={<Search size={14} aria-hidden />}
            />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.platform')}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <Home />
                      <span>{t('sidebar.home')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Inbox />
                      <span>{t('sidebar.inbox')}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>12</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Calendar />
                      <span>{t('sidebar.calendar')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User />
                  <span>{t('sidebar.account')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.contentPlaceholder')}</p>
        </DemoPage>
      </SidebarProvider>
    )
  },
}

export const IconCollapsible: Story = {
  name: 'Icon-collapsible',
  render: function IconCollapsibleSidebar() {
    const { t } = useTranslation()
    return (
      <SidebarProvider>
        <Sidebar collapsible='icon'>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size='lg'>
                  <Home />
                  <span>{t('sidebar.appName')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.platform')}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={t('sidebar.home')} isActive>
                      <Home />
                      <span>{t('sidebar.home')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={t('sidebar.inbox')}>
                      <Inbox />
                      <span>{t('sidebar.inbox')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={t('sidebar.settings')}>
                      <Settings />
                      <span>{t('sidebar.settings')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.iconCollapsibleDesc')}</p>
        </DemoPage>
      </SidebarProvider>
    )
  },
}

export const FloatingVariant: Story = {
  name: 'Floating variant',
  render: function FloatingSidebar() {
    const { t } = useTranslation()
    return (
      <SidebarProvider>
        <Sidebar variant='floating' collapsible='icon'>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.platform')}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={t('sidebar.home')} isActive>
                      <Home />
                      <span>{t('sidebar.home')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={t('sidebar.inbox')}>
                      <Inbox />
                      <span>{t('sidebar.inbox')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.floatingDesc')}</p>
        </DemoPage>
      </SidebarProvider>
    )
  },
}

export const InsetVariant: Story = {
  name: 'Inset variant',
  render: function InsetSidebar() {
    const { t } = useTranslation()
    return (
      <SidebarProvider>
        <Sidebar variant='inset' collapsible='icon'>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.platform')}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={t('sidebar.home')} isActive>
                      <Home />
                      <span>{t('sidebar.home')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={t('sidebar.settings')}>
                      <Settings />
                      <span>{t('sidebar.settings')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.insetDesc')}</p>
        </DemoPage>
      </SidebarProvider>
    )
  },
}

export const RightSide: Story = {
  name: 'Right side',
  render: function RightSideSidebar() {
    const { t } = useTranslation()
    return (
      <SidebarProvider>
        <Sidebar side='right'>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.platform')}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <Home />
                      <span>{t('sidebar.home')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings />
                      <span>{t('sidebar.settings')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.rightSideDesc')}</p>
        </DemoPage>
      </SidebarProvider>
    )
  },
}

export const WithSubmenuAndBadges: Story = {
  name: 'Submenus, badges & actions',
  render: function SubmenuSidebar() {
    const { t } = useTranslation()
    const [expanded, setExpanded] = React.useState(true)
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size='lg'>
                  <Home />
                  <span>{t('sidebar.appName')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.projects')}</SidebarGroupLabel>
              <SidebarGroupAction aria-label={t('sidebar.addProject')}>
                <Plus size={14} aria-hidden />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setExpanded((value) => !value)}>
                      <ChevronRight
                        size={14}
                        style={{ transform: expanded ? 'rotate(90deg)' : undefined }}
                        aria-hidden
                      />
                      <span>{t('sidebar.engineering')}</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction showOnHover aria-label={t('common.more')}>
                      <MoreHorizontal size={14} aria-hidden />
                    </SidebarMenuAction>
                    {expanded && (
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href='#'>
                            {t('sidebar.frontend')}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href='#' isActive>
                            {t('sidebar.backend')}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Inbox />
                      <span>{t('sidebar.design')}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.submenuDesc')}</p>
        </DemoPage>
      </SidebarProvider>
    )
  },
}

export const LoadingSkeleton: Story = {
  name: 'Loading skeleton',
  render: function LoadingSkeletonSidebar() {
    const { t } = useTranslation()
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.platform')}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Array.from({ length: 6 }, (_, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.loadingDesc')}</p>
        </DemoPage>
      </SidebarProvider>
    )
  },
}

export const Controlled: Story = {
  render: function ControlledSidebar() {
    const { t } = useTranslation()
    const [open, setOpen] = React.useState(true)
    return (
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.platform')}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <Home />
                      <span>{t('sidebar.home')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header style={headerStyle}>
            <Button size='sm' onClick={() => setOpen((value) => !value)}>
              {open ? t('sidebar.collapse') : t('sidebar.expand')}
            </Button>
          </header>
        </SidebarInset>
      </SidebarProvider>
    )
  },
}
