import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SessionProvider from "./sessionprovider";
import { Provider } from "react-redux";
import rootRedux from "./store";

const montserrat = Montserrat({
  subsets: ["latin-ext"]
});

export const metadata: Metadata = {
  title: "4-MINATOR",
  description: "A simple connect 4 game with a twist!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
