import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import About from "./pages/About";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Hobbies from "./pages/Hobbies";
import SidebarMobile from "./components/SidebarMobile";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="bg-gray-700 min-h-screen m-0 flex">
      <BrowserRouter>
        <Sidebar />
        <SidebarMobile />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
