import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "HRU Referees",
  description: "MRGSZ Játékvezetői Bizottság",
  keywords: "referee, hru, játékvezető, rugby, rögbi"
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="bg-blue-50 flex-grow">{children}</main>
            <Footer />
            <ToastContainer position="bottom-center" autoClose={2000} />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default MainLayout;
