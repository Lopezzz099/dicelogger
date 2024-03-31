import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dicelogger",
  description:
    "Herramienta para que los jugadores y master de D&D puedan llevar sus partidas de manera más sencilla.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={jost.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
