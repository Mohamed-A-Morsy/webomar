import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AdsPanner from "./AdsPanner";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <AdsPanner />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
