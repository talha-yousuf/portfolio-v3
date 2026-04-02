import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/landing";
import ResumeRenderedPage from "./pages/resume/ResumeRenderedPage";
import ResumePdfPage from "./pages/resume/ResumePdfPage";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./global.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/resume" element={<ResumePdfPage />} />
            <Route path="/resume-rendered" element={<ResumeRenderedPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
