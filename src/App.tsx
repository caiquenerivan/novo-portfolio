import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import SidebarMobile from "./components/SidebarMobile";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
//import Hobbies from "./pages/Hobbies";
import NotFoundPage from "./pages/NotFoundPage";
import { Particulas } from "./components/Particulas";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <div className="bg-gray-700 min-h-screen m-0 flex">
      <BrowserRouter>
        <Sidebar />
        <SidebarMobile />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            {/*<Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>*/}
            {
              //<Route path="/hobbies" element={<Hobbies />} />
            }
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
        <Particulas />
      </BrowserRouter>
    </div>
  );
}

export default App;
