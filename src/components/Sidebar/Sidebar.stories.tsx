import type { Meta, StoryObj } from '@storybook/react'
import {
  BadgeCheck,
  Bell,
  Calendar,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  FileEdit,
  Home,
  Inbox,
  LogOut,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  Trash2,
  User,
} from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { MenuContent, MenuItem, MenuRoot, MenuSeparator, MenuTrigger } from '../Menu/Menu'
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

interface MailFolder {
  key: string
  labelKey: string
  icon: typeof Inbox
}

const mailFolders: MailFolder[] = [
  { key: 'inbox', labelKey: 'sidebar.inbox', icon: Inbox },
  { key: 'drafts', labelKey: 'sidebar.drafts', icon: FileEdit },
  { key: 'sent', labelKey: 'sidebar.sent', icon: Send },
  { key: 'trash', labelKey: 'sidebar.trash', icon: Trash2 },
]

interface Mail {
  folder: string
  sender: string
  subject: string
  preview: string
}

const mailItems: Mail[] = [
  {
    folder: 'inbox',
    sender: 'William Smith',
    subject: 'Meeting Tomorrow',
    preview: 'Hi, just a reminder about our meeting tomorrow at 10am.',
  },
  {
    folder: 'inbox',
    sender: 'Alice Johnson',
    subject: 'Re: Project Update',
    preview: 'Thanks for the update. Looks like we are on track.',
  },
  {
    folder: 'drafts',
    sender: 'Me',
    subject: 'Q3 budget notes',
    preview: 'Draft — still need to fill in the marketing numbers.',
  },
  {
    folder: 'sent',
    sender: 'Me',
    subject: 'Invoice #1042',
    preview: 'Attached is the invoice for last month, let me know.',
  },
  {
    folder: 'trash',
    sender: 'Newsletter',
    subject: 'Weekly digest',
    preview: 'This is your weekly summary of activity.',
  },
]

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
        <Sidebar rail={<SidebarRail />}>
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
        <Sidebar collapsible='icon' rail={<SidebarRail />}>
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
        <Sidebar variant='floating' collapsible='icon' rail={<SidebarRail />}>
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
        <Sidebar variant='inset' collapsible='icon' rail={<SidebarRail />}>
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
        <Sidebar side='right' rail={<SidebarRail />}>
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
        <Sidebar rail={<SidebarRail />}>
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
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.submenuDesc')}</p>
        </DemoPage>
      </SidebarProvider>
    )
  },
}

export const WithUserFooter: Story = {
  name: 'With user footer',
  render: function UserFooterSidebar() {
    const { t } = useTranslation()
    return (
      <SidebarProvider>
        <Sidebar rail={<SidebarRail />}>
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
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <MenuRoot>
                  <SidebarMenuButton size='lg' render={<MenuTrigger />}>
                    <Avatar fallback='JD' size='sm' />
                    <span>Jane Doe</span>
                    <ChevronsUpDown size={16} aria-hidden />
                  </SidebarMenuButton>
                  <MenuContent side='top' align='start'>
                    <MenuItem>
                      <BadgeCheck size={14} aria-hidden />
                      {t('sidebar.account')}
                    </MenuItem>
                    <MenuItem>
                      <CreditCard size={14} aria-hidden />
                      {t('sidebar.billing')}
                    </MenuItem>
                    <MenuItem>
                      <Bell size={14} aria-hidden />
                      {t('sidebar.notifications')}
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem>
                      <LogOut size={14} aria-hidden />
                      {t('sidebar.logOut')}
                    </MenuItem>
                  </MenuContent>
                </MenuRoot>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.userFooterDesc')}</p>
        </DemoPage>
      </SidebarProvider>
    )
  },
}

export const NestedSidebar: Story = {
  name: 'Nested sidebar',
  render: function NestedSidebarDemo() {
    const { t } = useTranslation()
    const [activeFolder, setActiveFolder] = React.useState('inbox')
    const visibleMail = mailItems.filter((mail) => mail.folder === activeFolder)

    return (
      <SidebarProvider style={{ '--sidebar-width': '20rem' } as React.CSSProperties}>
        <Sidebar collapsible='icon' style={{ overflow: 'hidden' }} rail={<SidebarRail />}>
          <div style={{ display: 'flex', blockSize: '100%', inlineSize: '100%' }}>
            <Sidebar
              collapsible='none'
              style={
                {
                  '--sidebar-width': 'var(--sidebar-width-icon)',
                  borderInlineEnd: '1px solid var(--color-border)',
                } as React.CSSProperties
              }
            >
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size='lg'>
                      <Home />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {mailFolders.map((folder) => (
                        <SidebarMenuItem key={folder.key}>
                          <SidebarMenuButton
                            tooltip={t(folder.labelKey)}
                            aria-label={t(folder.labelKey)}
                            isActive={activeFolder === folder.key}
                            onClick={() => setActiveFolder(folder.key)}
                            style={{ justifyContent: 'center' }}
                          >
                            <folder.icon />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <Sidebar
              collapsible='none'
              style={{ '--sidebar-width': 'auto', flex: '1 1 auto' } as React.CSSProperties}
            >
              <SidebarHeader>
                <SidebarInput
                  placeholder={t('sidebar.searchMail')}
                  startSlot={<Search size={14} aria-hidden />}
                />
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  {visibleMail.map((mail) => (
                    <SidebarMenuItem key={mail.subject}>
                      <SidebarMenuButton style={{ blockSize: 'auto', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                          <span>{mail.sender}</span>
                          <span style={{ color: 'var(--color-fg-muted)' }}>{mail.subject}</span>
                          <span
                            style={{
                              color: 'var(--color-fg-muted)',
                              fontSize: 'var(--font-size-xs)',
                            }}
                          >
                            {mail.preview}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {visibleMail.length === 0 && (
                    <p style={descriptionStyle}>{t('sidebar.noMail')}</p>
                  )}
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
          </div>
        </Sidebar>
        <DemoPage>
          <p style={descriptionStyle}>{t('sidebar.nestedSidebarDesc')}</p>
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
        <Sidebar rail={<SidebarRail />}>
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
        <Sidebar rail={<SidebarRail />}>
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
