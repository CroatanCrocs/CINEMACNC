import "./globals.css";
import { Header } from '../components/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="min-h-screen mx-auto max-w-7xl">
          <div>
          <Header />
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
