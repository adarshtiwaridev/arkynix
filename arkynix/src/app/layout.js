import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export const metadata = {
  title: "Software Agency",
  description: "Professional Software Development & Design Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
