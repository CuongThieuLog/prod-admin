'use client'

import { defaultTheme } from '@/libs/config/theme/theme'
import createCache, { Options } from '@emotion/cache'
import { CacheProvider, ThemeProvider as MuiThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'

type ThemeProviderProps = Readonly<{
  children: React.ReactNode
  options: Options
}>

function ThemeProvider({ children, options }: ThemeProviderProps) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />

          {children}
        </LocalizationProvider>
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export { ThemeProvider }
