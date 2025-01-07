import DetailPage from "./Components/DetailPage";
import Grid from "./Components/Grid";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import { PropertyProvider } from "./Components/api/Context";

function App() {
  return (
    <>
      <PropertyProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/detail/:slug" element={<DetailPage />} />
          </Routes>
        </main>
      </PropertyProvider>
    </>
  );
}

function AppContent() {
  return (
    <>
      <Grid />
    </>
  );
}

export default App;
