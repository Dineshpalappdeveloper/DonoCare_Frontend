"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { Provider } from "react-redux";
import store from "@/Redux/store";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body >
        <div className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200">
          <Provider store={store}>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            {children}
          </Provider>
        </div>
      </body>

    </html>
  );
}
