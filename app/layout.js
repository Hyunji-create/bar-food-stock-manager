export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Bar Stock Manager</title>
        {/* This script makes Tailwind work instantly without complex setup */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-50 m-0 p-0">{children}</body>
    </html>
  );
}
