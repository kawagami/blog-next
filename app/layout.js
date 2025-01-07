import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Suspense } from "react";
import LoadingComponent from "@/components/loading-component";
import AppProvider from "@/provider/app-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kawa's Blog",
  description: "kawa blog ongoing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-blue-100 via-green-100 to-red-100 dark:from-blue-900 dark:via-green-900 dark:to-red-900 dark:text-white`}>
        <AppProvider>
          <Header />

          <main className="min-h-[calc(100svh-50px-50px)] overflow-hidden flex flex-col items-center justify-start pt-4">
            <Suspense fallback={<LoadingComponent />}>
              {children}
            </Suspense>
          </main>

          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
