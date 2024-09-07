import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/lib/context/user";
import './globals.css';
import { HighlightsProvider } from '@/lib/context/highlight';
import CookiePolicy from "@/components/cookiePolicy";
import { GoogleAnalytics } from '@next/third-parties/google'
import { CommentCountProvider } from "@/lib/context/commentcount";
const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Apjot",
  description: "A public Journal of Thoughts",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
      <link rel="icon" href="/favicon.png" sizes="any" />
        <UserProvider>
          <CommentCountProvider>
          <HighlightsProvider>
            <Header />
            {children}
            <CookiePolicy/>
            <Footer />
          </HighlightsProvider>
          </CommentCountProvider>
        </UserProvider>
      </body>
      <GoogleAnalytics gaId="G-BWV7N0MFWX" />
    </html>
  );
}
