/* eslint-disable react-refresh/only-export-components */
import '@/theme/main.scss'
import { DirectionProvider } from '@base-ui/react/direction-provider'
import type { DocsContainerProps } from '@storybook/addon-docs/blocks'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import type { Decorator, Preview } from '@storybook/react'
import prettierBabel from 'prettier/plugins/babel'
import prettierEstree from 'prettier/plugins/estree'
import * as prettier from 'prettier/standalone'
import React from 'react'
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events'
import { themes } from 'storybook/theming'
import { DocsPage } from './DocsPage'
import './i18n'
import { LocaleProvider, type Locale } from './locale'

function StoryWrapper({
  Story,
  theme,
  locale,
  fullscreen,
}: {
  Story: React.ComponentType
  theme: string
  locale: Locale
  fullscreen: boolean
}) {
  const dir = locale === 'he' ? 'rtl' : 'ltr'

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  // Portals append directly to document.body, outside the story wrapper's DOM
  // subtree, so they don't inherit `dir`. Watch for new body children and stamp
  // the current dir on them so portaled popups/modals/tooltips are also RTL.
  React.useEffect(() => {
    if (dir === 'ltr') return
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            node.setAttribute('dir', dir)
          }
        }
      }
    })
    observer.observe(document.body, { childList: true })
    return () => observer.disconnect()
  }, [dir])

  return (
    <DirectionProvider direction={dir}>
      <LocaleProvider locale={locale}>
        <div
          data-theme={theme}
          dir={dir}
          lang={locale}
          style={{
            padding: fullscreen ? 0 : '2rem',
            background: 'var(--color-bg)',
            color: 'var(--color-fg)',
          }}
        >
          <Story />
        </div>
      </LocaleProvider>
    </DirectionProvider>
  )
}

function ThemedDocsContainer({ children, context }: React.PropsWithChildren<DocsContainerProps>) {
  const getInitialTheme = () => {
    const params = new URLSearchParams(window.location.search)
    const globals = params.get('globals') ?? ''
    if (globals.includes('theme:dark')) return true
    if (globals.includes('theme:light')) return false
    try {
      const story = context.storyById()
      return context.getStoryContext(story).globals?.['theme'] === 'dark'
    } catch {
      return false
    }
  }

  const [isDark, setIsDark] = React.useState(getInitialTheme)

  React.useEffect(() => {
    const onGlobals = ({ globals }: { globals: Record<string, string> }) => {
      setIsDark(globals['theme'] === 'dark')
    }
    context.channel.on(SET_GLOBALS, onGlobals)
    context.channel.on(GLOBALS_UPDATED, onGlobals)
    return () => {
      context.channel.off(SET_GLOBALS, onGlobals)
      context.channel.off(GLOBALS_UPDATED, onGlobals)
    }
  }, [context.channel])

  React.useEffect(() => {
    const theme = isDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
  }, [isDark])

  return (
    <DocsContainer context={context} theme={isDark ? themes.dark : themes.light}>
      {children}
    </DocsContainer>
  )
}

const withThemeAndDir: Decorator = (Story, context) => {
  const theme = context.globals['theme'] === 'dark' ? 'dark' : 'light'
  const locale: Locale = context.globals['locale'] === 'he' ? 'he' : 'en'
  const fullscreen = context.parameters['layout'] === 'fullscreen'
  return <StoryWrapper Story={Story} theme={theme} locale={locale} fullscreen={fullscreen} />
}

const preview: Preview = {
  decorators: [withThemeAndDir],
  parameters: {
    docs: {
      container: ThemedDocsContainer,
      page: DocsPage,
      source: {
        transform: (code: string) => {
          // Keep the full function (signature + body), strip only `render:` wrapper
          const funcStart = code.search(/\bfunction\s+\w/)
          if (funcStart === -1) return code

          let depth = 0
          let i = funcStart
          let inString: string | null = null

          while (i < code.length) {
            const ch = code[i]
            if (inString) {
              if (ch === inString && code[i - 1] !== '\\') inString = null
            } else if (ch === '"' || ch === "'" || ch === '`') {
              inString = ch
            } else if (ch === '{') {
              depth++
            } else if (ch === '}') {
              depth--
              if (depth === 0) {
                i++
                break
              }
            }
            i++
          }

          const extracted = code.slice(funcStart, i).trim()

          return prettier
            .format(extracted, {
              parser: 'babel',
              plugins: [prettierBabel, prettierEstree],
              printWidth: 100,
              tabWidth: 2,
              semi: false,
              singleQuote: true,
              jsxSingleQuote: true,
            })
            .catch(() => extracted)
        },
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      name: 'Locale',
      description: 'Text direction',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English', right: 'LTR' },
          { value: 'he', title: 'Hebrew', right: 'RTL' },
        ],
        dynamicTitle: true,
      },
    },
  },
}

export default preview
