import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Magarulaw - Avar cultural platform',
  title: 'Magarulaw',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
