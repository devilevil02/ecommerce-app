import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/ReactToastify.min.css";

import ECommerceHome from "./Home";
import ProductPage from "./ProductPage";
import NotFoundPage from "./NotFound";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import CartContextProvider from "./context/CartContextProvider";
import CartStateContextProvider from "./context/CartStateContextProvider";

import "./styles.css";
import AboutPage from "./About";

function App() {
  useEffect(() => {
    (async () => {
      const name = localStorage.getItem("name") as string;
      if (name) return;
      const { data, status } = await axios.get("https://randomuser.me/api");
      if ([200, 201].includes(status)) {
        const name = data.results[0].name;
        localStorage.setItem("name", `${name.first} ${name.last}`);
      }
    })();
  }, []);

  return (
    <section className="relative mx-auto w-full px-4 lg:px-0 max-w-[1200px] pb-32 text-neutral-800">
      <ToastContainer />
      <CartContextProvider>
        <CartStateContextProvider>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<ECommerceHome />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<></>} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Cart />
        </CartStateContextProvider>
      </CartContextProvider>
    </section>
  );
}

export default App;
