import { Geist, Geist_Mono } from "next/font/google";
import { Roboto, Sarabun } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";
import Header from "#/components/layout/Header";


// font
const magistral = localFont({
  src: [
    {
      path: './fonts/FS-Magistral/FS-Magistral-Medium.ttf', // Thay đổi đúng tên file của bạn
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/FS-Magistral/FS-Magistral-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-magistral', // Biến CSS để dùng với Tailwind
});

const beauSans = localFont({
  src: './fonts/FS-PFBeauSansPro/FS-PFBeauSansPro-Regular.ttf', 
  variable: '--font-beausans',
});

const roboto = Roboto({
  subsets: ['vietnamese'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

const sarabun = Sarabun({
  subsets: ['vietnamese'],
  weight: ['400', '700'],
  variable: '--font-sarabun',
});

export const metadata = {
  title: "Viettel Lạng Sơn",
  description: "Theo cách của bạn",
};



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${magistral.variable} ${beauSans.variable} ${roboto.variable} ${sarabun.variable} font-roboto`}
    >
      <Header/>
      <body className="">{children}</body>
    </html>
  );
}
