import './globals.css'
import React from 'react'

export const metadata = {
  title: '246 N 3rd St Property Portal',
  description: 'Private property collaboration portal for Stephen, Melissa, and Realtor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}