import Providers from "@/contexts/providers";
import { DM_Sans, Geist, Urbanist } from "next/font/google";
import "../styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Insurity - Admin Dashboard",
  description:
    "Admin dashboard for Insurity-360 application using Next.js and Tailwind CSS with Google fonts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${geist.variable} ${urbanist.variable} ${dmSans.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
