import Providers from "@/components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import TopNav from "@/components/navbar/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Love Me",
  description: "Marriage App For Bangladesh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
