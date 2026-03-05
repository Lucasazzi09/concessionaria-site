export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, backgroundColor: '#f5f5f5' }}>{children}</body>
    </html>
  )
}