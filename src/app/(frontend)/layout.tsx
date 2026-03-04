import './styles.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
