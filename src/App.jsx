import { HashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout"
import Router from "./router";
import { GalleryProvider } from "./Context/GalleryContext";

function App() {
  return (
    <HashRouter>
      <GalleryProvider>
        <Layout>
          <Router />
        </Layout>
      </GalleryProvider>
    </HashRouter>
  );
}

export default App;