import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/ui/sidebar";
import RecoidContextProvider from "./recoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatGPT replica",
  description:
    "This ChatGPT replica made by Shalom https://github.com/Shalom2212",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="bg-[#40414f] ">
          <RecoidContextProvider>
            <div className="flex">
              <Sidebar />

              <div className="flex h-full flex-col w-full">{children}</div>
            </div>
          </RecoidContextProvider>
        </div>
      </body>
    </html>
  );
}
