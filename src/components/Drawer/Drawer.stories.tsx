import type { Meta, StoryObj } from '@storybook/react'
import { X } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button/Button'
import {
  DrawerActions,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerProvider,
  DrawerRoot,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  type DrawerSnapPoint,
} from './Drawer'

export default {
  title: 'Overlays/Drawer',
  component: DrawerRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DrawerRoot>

type Story = StoryObj<typeof DrawerRoot>

export const Default: Story = {
  name: 'Bottom (default)',
  render: function Default() {
    const { t } = useTranslation()
    return (
      <DrawerRoot>
        <DrawerTrigger>{t('drawer.openDrawer')}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('drawer.notifications')}</DrawerTitle>
            <DrawerDescription>{t('drawer.notificationsDesc')}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <DrawerActions>
              <DrawerClose>{t('common.close')}</DrawerClose>
            </DrawerActions>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    )
  },
}

export const TopPanel: Story = {
  name: 'Top panel',
  render: function TopPanel() {
    const { t } = useTranslation()
    return (
      <DrawerRoot swipeDirection='up' side='top'>
        <DrawerTrigger>{t('drawer.openTopPanel')}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('drawer.alerts')}</DrawerTitle>
            <DrawerDescription>{t('drawer.topPanelDesc')}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <DrawerActions>
              <DrawerClose>{t('common.dismiss')}</DrawerClose>
            </DrawerActions>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    )
  },
}

export const RightPanel: Story = {
  name: 'Right panel',
  render: function RightPanel() {
    const { t } = useTranslation()
    return (
      <DrawerRoot swipeDirection='right' side='right'>
        <DrawerTrigger>{t('drawer.openPanel')}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('drawer.settings')}</DrawerTitle>
            <DrawerDescription>{t('drawer.rightPanelDesc')}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <DrawerActions>
              <DrawerClose>{t('common.close')}</DrawerClose>
            </DrawerActions>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    )
  },
}

export const LeftPanel: Story = {
  name: 'Left panel',
  render: function LeftPanel() {
    const { t } = useTranslation()
    return (
      <DrawerRoot swipeDirection='left' side='left'>
        <DrawerTrigger>{t('common.more')}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('drawer.navigation')}</DrawerTitle>
            <DrawerDescription>{t('drawer.leftPanelDesc')}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <DrawerActions>
              <DrawerClose>{t('common.close')}</DrawerClose>
            </DrawerActions>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    )
  },
}

export const WithActions: Story = {
  name: 'With actions',
  render: function WithActions() {
    const { t } = useTranslation()
    return (
      <DrawerRoot>
        <DrawerTrigger variant='danger'>{t('drawer.deleteAccount')}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('drawer.deleteAccountQ')}</DrawerTitle>
            <DrawerDescription>{t('drawer.deleteAccountDesc')}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <DrawerActions>
              <DrawerClose>{t('common.cancel')}</DrawerClose>
              <DrawerClose variant='danger'>{t('common.delete')}</DrawerClose>
            </DrawerActions>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    )
  },
}

export const Controlled: Story = {
  render: function ControlledDrawer() {
    const { t } = useTranslation()
    const [open, setOpen] = React.useState(false)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          alignItems: 'center',
        }}
      >
        <Button onClick={() => setOpen(true)}>{t('dialog.openProgrammatically')}</Button>
        <DrawerRoot open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t('drawer.controlledDrawer')}</DrawerTitle>
              <DrawerDescription>{t('drawer.controlledDrawerDesc')}</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <DrawerActions>
                <DrawerClose>{t('common.close')}</DrawerClose>
              </DrawerActions>
            </DrawerBody>
          </DrawerContent>
        </DrawerRoot>
      </div>
    )
  },
}

const TOP_MARGIN_REM = 2
const SNAP_POINTS: DrawerSnapPoint[] = ['20rem', 1]

export const SnapPoints: Story = {
  name: 'Snap points',
  render: function SnapPointsDrawer() {
    const { t } = useTranslation()
    return (
      <DrawerRoot snapPoints={SNAP_POINTS}>
        <DrawerTrigger>{t('drawer.openSnap')}</DrawerTrigger>
        <DrawerContent style={{ '--top-margin': `${TOP_MARGIN_REM}rem` } as React.CSSProperties}>
          <DrawerHeader>
            <DrawerTitle>{t('drawer.snapPoints')}</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <DrawerDescription>{t('drawer.snapPointsDesc')}</DrawerDescription>
            <div style={{ display: 'grid', gap: 'var(--space-3)' }} aria-hidden='true'>
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    height: '3rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-border)',
                  }}
                />
              ))}
            </div>
            <DrawerActions>
              <DrawerClose>{t('common.close')}</DrawerClose>
            </DrawerActions>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    )
  },
}

export const NonModal: Story = {
  name: 'Non-modal',
  render: function NonModalDrawer() {
    const { t } = useTranslation()
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-fg-muted)',
            textAlign: 'center',
            maxWidth: '20rem',
          }}
        >
          {t('drawer.nonModalDesc')}
        </p>
        <DrawerRoot modal={false} disablePointerDismissal side='right'>
          <DrawerTrigger>{t('drawer.openNonModal')}</DrawerTrigger>
          <DrawerContent backdropProps={{ style: { display: 'none' } }}>
            <DrawerHeader>
              <DrawerTitle>{t('drawer.nonModalPanel')}</DrawerTitle>
              <DrawerDescription>{t('drawer.nonModalPanelDesc')}</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <DrawerActions>
                <DrawerClose>{t('common.close')}</DrawerClose>
              </DrawerActions>
            </DrawerBody>
          </DrawerContent>
        </DrawerRoot>
      </div>
    )
  },
}

export const IndentEffect: Story = {
  name: 'Indent effect',
  render: function IndentEffectDrawer() {
    const { t } = useTranslation()
    return (
      <DrawerProvider>
        <DrawerIndentBackground />
        <DrawerIndent style={{ width: '100%', height: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-4)',
              padding: 'var(--space-6)',
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-fg-muted)',
                textAlign: 'center',
                maxWidth: '22rem',
                margin: 0,
              }}
            >
              {t('drawer.indentEffectDesc')}
            </p>
            <DrawerRoot>
              <DrawerTrigger>{t('drawer.openIndent')}</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{t('drawer.indentEffect')}</DrawerTitle>
                  <DrawerDescription>{t('drawer.indentEffectPanelDesc')}</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <DrawerActions>
                    <DrawerClose>{t('common.close')}</DrawerClose>
                  </DrawerActions>
                </DrawerBody>
              </DrawerContent>
            </DrawerRoot>
          </div>
        </DrawerIndent>
      </DrawerProvider>
    )
  },
}

export const WithSwipeArea: Story = {
  name: 'SwipeArea (edge swipe)',
  render: function WithSwipeAreaDrawer() {
    const { t } = useTranslation()
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-fg-muted)',
            textAlign: 'center',
            maxWidth: '22rem',
          }}
        >
          {t('drawer.swipeAreaDesc')}
        </p>
        <DrawerRoot swipeDirection='right'>
          <DrawerSwipeArea
            style={{
              position: 'relative',
              inset: 'unset',
              width: '3rem',
              height: '6rem',
              border: '2px dashed var(--color-border-strong)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-fg-muted)',
            }}
          >
            {t('drawer.swipe')}
          </DrawerSwipeArea>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t('drawer.openedViaSwipe')}</DrawerTitle>
              <DrawerDescription>{t('drawer.swipeAreaPanelDesc')}</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <DrawerActions>
                <DrawerClose>{t('common.close')}</DrawerClose>
              </DrawerActions>
            </DrawerBody>
          </DrawerContent>
        </DrawerRoot>
      </div>
    )
  },
}

export const NestedDrawers: Story = {
  name: 'Nested drawers',
  render: function NestedDrawers() {
    const { t } = useTranslation()
    return (
      <DrawerRoot>
        <DrawerTrigger>{t('drawer.openOuter')}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('drawer.outerDrawer')}</DrawerTitle>
            <DrawerDescription>{t('drawer.outerDrawerDesc')}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <DrawerActions>
              <DrawerRoot>
                <DrawerTrigger variant='primary'>{t('drawer.openInner')}</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{t('drawer.innerDrawer')}</DrawerTitle>
                    <DrawerDescription>{t('drawer.innerDrawerDesc')}</DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <DrawerActions>
                      <DrawerClose>{t('common.close')}</DrawerClose>
                    </DrawerActions>
                  </DrawerBody>
                </DrawerContent>
              </DrawerRoot>
              <DrawerClose>{t('drawer.closeOuter')}</DrawerClose>
            </DrawerActions>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    )
  },
}

export const NestedDifferentSizes: Story = {
  name: 'Nested drawers (different sizes)',
  render: function NestedDifferentSizes() {
    const { t } = useTranslation()
    return (
      <DrawerRoot>
        <DrawerTrigger>{t('drawer.openOuter')}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('drawer.outerDrawer')}</DrawerTitle>
            <DrawerDescription>{t('drawer.nestedSizesOuterDesc')}</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <div style={{ display: 'grid', gap: 'var(--space-3)' }} aria-hidden='true'>
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    height: '3.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-border)',
                  }}
                />
              ))}
            </div>
            <DrawerActions>
              <DrawerRoot>
                <DrawerTrigger variant='primary'>{t('drawer.openInner')}</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{t('drawer.innerDrawer')}</DrawerTitle>
                    <DrawerDescription>{t('drawer.nestedSizesInnerDesc')}</DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <div style={{ display: 'grid', gap: 'var(--space-3)' }} aria-hidden='true'>
                      {Array.from({ length: 3 }, (_, i) => (
                        <div
                          key={i}
                          style={{
                            height: '3.5rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--color-border)',
                          }}
                        />
                      ))}
                    </div>
                    <DrawerActions>
                      <DrawerClose>{t('common.close')}</DrawerClose>
                    </DrawerActions>
                  </DrawerBody>
                </DrawerContent>
              </DrawerRoot>
              <DrawerClose>{t('drawer.closeOuter')}</DrawerClose>
            </DrawerActions>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    )
  },
}

export const Flat: Story = {
  name: 'Flat variant',
  render: function FlatDrawer() {
    const { t } = useTranslation()
    return (
      <DrawerRoot variant='flat'>
        <DrawerTrigger>{t('drawer.openFilters')}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t('drawer.filters')}</DrawerTitle>
            <DrawerClose variant='ghost' size='icon-sm'>
              <X size='1.25rem' />
            </DrawerClose>
          </DrawerHeader>
          <DrawerBody>
            <DrawerDescription>{t('drawer.filtersDesc')}</DrawerDescription>
            <DrawerActions>
              <DrawerClose variant='secondary'>{t('drawer.clearAll')}</DrawerClose>
              <DrawerClose variant='primary'>{t('drawer.applyFilters')}</DrawerClose>
            </DrawerActions>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    )
  },
}
