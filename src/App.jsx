import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout"
import Router from "./router";
import { GalleryProvider } from "./Context/GalleryContext";

function App() {
  return (
    <BrowserRouter>
      <GalleryProvider>
        <Layout>
          <Router />
        </Layout>
      </GalleryProvider>
    </BrowserRouter>
  );
}

export default App;