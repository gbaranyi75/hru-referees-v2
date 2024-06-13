import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "HRU Referees",
  description: "MRGSZ Játékvezetői Bizottság",
  keywords: "referee, hru, játékvezető",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="bg-blue-50 flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
