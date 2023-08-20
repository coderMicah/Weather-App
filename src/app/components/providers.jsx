'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children,...props }) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}