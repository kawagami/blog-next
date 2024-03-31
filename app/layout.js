import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kawa's Blog",
  description: "kawa blog ongoing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <main className="min-h-[calc(100svh-50px-50px)] bg-white dark:bg-gray-600 dark:text-white overflow-hidden flex flex-col justify-center items-center">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
