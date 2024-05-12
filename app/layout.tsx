

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({
  subsets: ["latin-ext"]
});

export const metadata: Metadata = {
  title: "4-MINATOR",
  description: "A connect 4 game for a semester project",
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
