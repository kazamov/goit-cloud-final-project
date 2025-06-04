import './global.css';

export const metadata = {
  title: 'Posts Manager - GoIT Cloud Final Project',
  description: 'A complete posts management system with CRUD operations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
