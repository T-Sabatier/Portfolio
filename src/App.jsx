import { HashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout"
import Router from "./router";
import { GalleryProvider } from "./Context/GalleryContext";

function App() {
  return (
    <GalleryProvider>
      <HashRouter>
        <Layout>
          <Router />
        </Layout>
      </HashRouter>
    </GalleryProvider>
  );
}

export default App;