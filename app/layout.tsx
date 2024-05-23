import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/components/provider/provider";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "PLAYTORIUM_ASSIGNMENT",
  description: "PLAYTORIUM_ASSIGNMENT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <Providers>
          <Suspense fallback={<Loading />}>
            {children}
            </Suspense>
        </Providers>
      </body>
    </html>
  );
}
