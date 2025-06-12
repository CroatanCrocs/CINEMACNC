import "./globals.css";
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { ThemeProvider } from '../components/themes-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A simple and elegant web application built with Next.js and Tailwind CSS." />
        <meta name="keywords" content="Next.js, Tailwind CSS, web application, frontend" />
        <meta name="author" content="Your Name" />
        <title>Confia na Call Movie Night App</title>
      </head>
      <body suppressHydrationWarning>
        <div>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-h-screen mx-auto max-w-7xl">
              <Header />
              <main className="bg-[#1f1f1f] h-[75vh]">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
