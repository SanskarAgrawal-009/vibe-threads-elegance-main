export const metadata = {
  title: 'ELEGANCE THREADS',
  description: 'Minimalist Luxury Fashion & Haute Couture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
