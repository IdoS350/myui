import type { Meta, StoryObj } from '@storybook/react'
import { BarChart2, Globe, LayoutDashboard, Link2, Settings, Users } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from './NavigationMenu'

export default {
  title: 'Navigation/NavigationMenu',
  component: NavigationMenuRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NavigationMenuRoot>

type Story = StoryObj<typeof NavigationMenuRoot>

interface NavCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function NavCard({ icon, title, description }: NavCardProps) {
  return (
    <a
      href='#'
      style={{
        display: 'flex',
        gap: 12,
        padding: '10px 12px',
        borderRadius: 6,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background 150ms',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = 'var(--color-hover)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.background = ''
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: 8,
          background: 'var(--color-hover)',
          color: 'var(--color-primary)',
        }}
      >
        {icon}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-fg)',
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-fg-subtle)' }}>
          {description}
        </span>
      </span>
    </a>
  )
}

export const Primary: Story = {
  render: function Primary() {
    const { t } = useTranslation()
    return (
      <NavigationMenuRoot>
        <NavigationMenuList>
          <NavigationMenuItem value='product'>
            <NavigationMenuTrigger>{t('menu.product')}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 220px)',
                  gap: 4,
                }}
              >
                <NavCard
                  icon={<LayoutDashboard size={16} />}
                  title={t('common.dashboard')}
                  description='Overview of metrics and activity'
                />
                <NavCard
                  icon={<BarChart2 size={16} />}
                  title='Analytics'
                  description='Track usage, growth, and trends'
                />
                <NavCard
                  icon={<Users size={16} />}
                  title={t('tabs.projects')}
                  description='Collaborate with your team'
                />
                <NavCard
                  icon={<Settings size={16} />}
                  title={t('common.settings')}
                  description='Configure your workspace'
                />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value='company'>
            <NavigationMenuTrigger>{t('fieldset.company')}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 180 }}>
                <NavCard
                  icon={<Globe size={16} />}
                  title='About'
                  description='Our story and mission'
                />
                <NavCard
                  icon={<Users size={16} />}
                  title='Careers'
                  description='Join our growing team'
                />
                <NavCard
                  icon={<Link2 size={16} />}
                  title='Press'
                  description='News and media resources'
                />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href='#'>{t('separator.pricing')}</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href='#'>{t('separator.blog')}</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenuRoot>
    )
  },
}

export const WithLinks: Story = {
  render: function WithLinks() {
    const { t } = useTranslation()
    return (
      <NavigationMenuRoot>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href='#' active>
              {t('separator.home')}
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href='#'>{t('separator.pricing')}</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href='#'>{t('separator.blog')}</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href='#'>{t('common.settings')}</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuRoot>
    )
  },
}

export const Vertical: Story = {
  render: function Vertical() {
    const { t } = useTranslation()
    return (
      <div style={{ width: 220 }}>
        <NavigationMenuRoot orientation='vertical'>
          <NavigationMenuList
            style={{ flexDirection: 'column', alignItems: 'stretch', width: '100%' }}
          >
            <NavigationMenuItem value='overview'>
              <NavigationMenuTrigger style={{ width: '100%', justifyContent: 'space-between' }}>
                {t('tabs.overview')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minWidth: 180,
                  }}
                >
                  <NavCard
                    icon={<LayoutDashboard size={16} />}
                    title={t('common.dashboard')}
                    description='View key metrics'
                  />
                  <NavCard
                    icon={<BarChart2 size={16} />}
                    title={t('tabs.activity')}
                    description='Recent team activity'
                  />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href='#' style={{ width: '100%' }}>
                {t('tabs.projects')}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href='#' style={{ width: '100%' }}>
                {t('common.settings')}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href='#' style={{ width: '100%' }}>
                {t('common.billing')}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuViewport side='right' sideOffset={4} />
        </NavigationMenuRoot>
      </div>
    )
  },
}
