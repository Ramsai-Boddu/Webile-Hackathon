import "./globals.css";

export const metadata = {
  title: "Wealth Intelligence Platform",
  description: "Unified Wealth Intelligence Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">

      <body>
        {children}
      </body>

    </html>
  );
}