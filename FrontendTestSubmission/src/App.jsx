import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import ShortenPage from "./page/ShortenPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenPage />} />
        <Route path="/stats" element={<Home />} />
      </Routes>
    </Router>
  );
}
