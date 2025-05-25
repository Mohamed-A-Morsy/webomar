import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NewsTicker from "./NewsTicker";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <NewsTicker />
      <Footer />
    </div>
  );
};

export default Layout;
