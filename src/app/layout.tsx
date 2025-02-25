import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/Modal/Modal";
import RegisterModal from "./components/Modal/RegisterModal";
export const metadata: Metadata = {
  title: "Aribnb",
  description: "Aribnb clone",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          {/* <Modal actionLabel='Submit' title='Hello World' isOpen/>  */}
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
