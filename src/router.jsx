import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Error from "./Pages/Error/Error";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
export default Router;