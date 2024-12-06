import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherNavbar from "./components/MyNavbar";
import WeatherApp from "./components/MyApp";
import WeatherDetails from "./components/MyDetail";
import Footer from "./components/MyFooter";

function App() {
  return (
    <BrowserRouter>
      <WeatherNavbar />
      <Routes>
        <Route path="/" element={<WeatherApp />}></Route>
        <Route path="/weather/:city" element={<WeatherDetails />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
