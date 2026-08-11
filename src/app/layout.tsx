import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/montserrat";
import "@fontsource/dm-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dashboards.grupomistico.cloud"),
  title: "Ritwal Intelligence · Base ejecutiva",
  description: "Plataforma interna de inteligencia ejecutiva y operativa de Ritwal.",
  applicationName: "Ritwal Intelligence",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f2e9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
