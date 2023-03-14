import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import Forgot from "./components/pages/Forgot";
import Laptop from "./components/Menu.js/laptop/Laptop";
import Mobile from "./components/Menu.js/Mobile/Mobile";
import Tv from "./components/Menu.js/TV/Tv";
import Watch from "./components/Menu.js/Watch/Watch";
import Ac from "./components/Menu.js/AC/Ac";
import Banner from "./components/pages/Banner";
import MyOrder from "./components/Order/MyOrder";
import FrontPage from "./components/pages/FrontPage";
// import "./components/Splash_screen.css"

function App() {
  const pathname = window.location.pathname
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />

        <nav>
        {pathname === "/" || pathname === "/login" || pathname === "/regi" ? (""): ( 

          <NavBar />
        )}
        </nav>

        {/* <Banner /> */}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myorder" element={<MyOrder />} />

            <Route path="/banner" element={<Banner />} />
            <Route path="/regi" element={<Registration />} />
            <Route path="forgot" element={<Forgot />} />

            <Route path="*" element={<NotFound />} />
            {/* Products routes */}
            <Route path="/laptop" element={<Laptop />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/ac" element={<Ac />} />
            <Route path="/tv" element={<Tv />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
