import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Error from "./Pages/Error/Error";
import Contact from "./Pages/Contact/Contact";
import Project from "./Pages/Project/Project";
import Details from "./Pages/Details/Details";


function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<Project />} />
      <Route path="/project/:id/details" element={<Details />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
export default Router;