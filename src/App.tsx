
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import Index from '@/pages/Index';
import News from '@/pages/News';
import NotFound from '@/pages/NotFound';
import GallerySection from './components/GallerySection';
import './i18n';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/news" element={<News />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/gallery" element={<GallerySection/>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
