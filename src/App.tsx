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
          <Route path="/shops" element={<ShopsContent />} />
          <Route path="/activity" element={<ActivityType />} />
          <Route path="/SubActivities/:id" element={<SubActivities />} />
          
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
