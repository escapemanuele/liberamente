import '@/src/index.css'
import { Providers } from './providers'
import Header from '@/src/components/landing-page/Header'

export const metadata = {
  title: 'BrainDump',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
