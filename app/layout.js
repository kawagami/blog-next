import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Suspense } from "react";
// import Loading from "./loading";
import NoteProvider from "@/provider/note-provider";
import Loading from "@/components/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kawa's Blog",
  description: "kawa blog ongoing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NoteProvider>
          <Header />

          <main className="min-h-[calc(100svh-50px-50px)] bg-white dark:bg-gray-600 dark:text-white overflow-hidden flex flex-col items-center justify-start pt-4">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>

          <Footer />
        </NoteProvider>
      </body>
    </html>
  );
}
