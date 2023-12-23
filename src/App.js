import "./App.css";
import Navbar from "./components/Navbar";
import Aftale from "./pages/Aftale";
import Opgaver from "./pages/Opgaver";
import Team from "./pages/Team";
import Vaerktoejer from "./pages/Værktøjer";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./components/AppContext"; // Context API

function App() {
  return (
    <AppProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/:urlID" element={<Opgaver />} />
          <Route path="/opgaver/:urlID" element={<Opgaver />} />
          <Route path="/team/:urlID" element={<Team />} />
          <Route path="/aftale/:urlID" element={<Aftale />} />
          <Route path="/vaerktoejer/:urlID" element={<Vaerktoejer />} />
        </Routes>
      </>
    </AppProvider>
  );
}

export default App;
