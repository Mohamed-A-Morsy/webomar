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
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/shops" element={<ShopsContent />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
