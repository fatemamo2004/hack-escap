import { Inter, JetBrains_Mono, Cairo } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata = {
  title: "Hack & Escape | Building a Cyber-Aware Generation",
  description: "Bilingual cybersecurity competition and initiative by Jordan Cyber Club.",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className={`${inter.variable} ${jetbrainsMono.variable} ${cairo.variable}`}>
      <body className={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
