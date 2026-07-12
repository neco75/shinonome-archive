import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "東雲地方気象資料室｜観測記録公開システム",
  description: "東雲地方の気象観測記録、施設台帳、地域資料を公開するデジタルアーカイブ。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
