import "./globals.css"; // This is the magic line that brings in Tailwind

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Bar Stock Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 m-0 p-0">
        {children}
      </body>
    </html>
  );
}
