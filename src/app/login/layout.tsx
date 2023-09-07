export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className="container flex h-screen items-center">
        {children}
        </body>
      </html>
    )
  }