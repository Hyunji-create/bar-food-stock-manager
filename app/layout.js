import "./globals.css";

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
