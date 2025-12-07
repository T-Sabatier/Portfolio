import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Error from "./Pages/Error/Error";
import Contact from "./Pages/Contact/Contact";
import Details from "./Pages/Details/Details";

function Router() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/project/:id/details" element={<Details />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AnimatePresence>
  );
}
export default Router;