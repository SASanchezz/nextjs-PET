import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/header'
import { Suspense } from 'react'
import { StaffToolbar } from 'src/components/staff-toolbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3Verse',
  description: 'Test task',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header />
        {children}
        <Suspense>
          <StaffToolbar />
        </Suspense>
      </body>
    </html>
  )
}
