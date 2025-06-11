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
import ActivityType from "./pages/ActivityType";
import SubActivities from "./pages/SubActivities";
import Gallery from "./pages/Gallery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Videos from "./pages/Vidoes";
import HallDetails from "./pages/HallDetails";
import Game from "./pages/Game";
import SocialActivitiesSection from "./components/SocialActivitiesSection";
import SocialActivities from "./pages/SocialActivities";
import ChairMan from "./pages/ChairMan";
import Jobs from "./pages/Jobs";
import Signin from "./components/sign/SignIn";
import Signup from "./components/sign/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/halls/:id" element={<HallDetails />} />
          {/* <Route path="/gallery" element={<GallerySection />} /> */}
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/shops" element={<ShopsContent />} />
          <Route path="/GallerySection" element={<GallerySection />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/shops" element={<ShopsContent />} />
          <Route path="/activity" element={<ActivityType />} />
          <Route path="/SubActivities/:id" element={<SubActivities />} />
          <Route path="/games-by-type" element={<Game />} />
          <Route path="/activities-by-type" element={<SocialActivities />} />
          <Route path="/chairman" element={<ChairMan />} />
          <Route path="/jobs" element={<Jobs />} />
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
