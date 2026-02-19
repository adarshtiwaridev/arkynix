import "./globals.css";

export const metadata = {
  title: "Software Agency",
  description: "Professional Software Development & Design Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
       {/* <Toaster richColors position="top-right" toastOptions={{ duration:3000 }} /> */}
        <main className="flex-1">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
