import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import ResumePage from "./pages/resume";
import portfolioData from "./data";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage data={portfolioData} />} />
          <Route path="/resume" element={<ResumePage data={portfolioData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
