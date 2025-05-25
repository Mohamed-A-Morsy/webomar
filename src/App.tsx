import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import News from "@/pages/News";
import NotFound from "@/pages/NotFound";
import GallerySection from "./components/GallerySection";
import "./i18n";
import Halls from "./pages/Halls";
import Layout from "@/components/Layout";
import ShopsContent from "./components/ShopsContent";
import NewsDetails from "./pages/NewsDetails";
import ActivityType from "./pages/ActivityType";
import SubActivities from "./pages/SubActivities";
import Gallery from "./pages/Gallery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Videos from "./pages/Vidoes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/GallerySection" element={<GallerySection />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/shops" element={<ShopsContent />} />
          <Route path="/activity" element={<ActivityType />} />
          <Route path="/SubActivities/:id" element={<SubActivities />} />
          <Route path="/videos" element={<Videos />} />
          
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />{" "}
    </Router>
  );
}

export default App;
