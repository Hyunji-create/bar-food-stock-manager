import "./globals.css"; 

export const metadata = {
  title: "Bar Food Stock Manager",
  description: "Mobile-friendly inventory tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
