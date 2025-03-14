import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import { Toaster } from "react-hot-toast";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modal/LoginModal";
import RegisterModal from "./components/modal/RegisterModal";
import RentModal from "./components/modal/RentModal";
export const metadata: Metadata = {
  title: "Aribnb",
  description: "Aribnb clone",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          {/* <Modal actionLabel='Submit' title='Hello World' isOpen/>  */}
          <Toaster/>
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser = {currentUser}/>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
