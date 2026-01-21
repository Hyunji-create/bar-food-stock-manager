import "./globals.css";

export const metadata = {
  title: "Bar Stock Manager",
  description: "Mobile stocktake for 4 venues",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
