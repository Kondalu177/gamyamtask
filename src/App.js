import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import ViewProduct from "./components/ViewProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add_Product" element={<AddProduct />} />
          <Route path="/view_Product" element={<ViewProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
