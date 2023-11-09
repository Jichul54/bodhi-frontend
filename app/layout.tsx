import Header from "../components/layouts/Header";
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html>
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </>
  );
}
