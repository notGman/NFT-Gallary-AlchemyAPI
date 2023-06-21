import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NFT Gallary",
  description: "A nextJs application to fetch NFTs from opensea. Created by @notGman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="./favicon.ico"/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
