import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NewsTicker from "./NewsTicker";
import AdsPanner from "./AdsPanner";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <AdsPanner />
      <main className="flex-grow">
        <Outlet />
      </main>
      <NewsTicker />
      <Footer />
    </div>
  );
};

export default Layout;
