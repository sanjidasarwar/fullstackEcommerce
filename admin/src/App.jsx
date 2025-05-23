import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Update from "./pages/Update";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const handleToken = (token) => {
    setToken(token);
  };

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {token === "" ? (
          <Login handleToken={handleToken} />
        ) : (
          <>
            <Navbar handleToken={handleToken} />
            <hr />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/update" element={<Update token={token} />} />
                  <Route path="/order" element={<Order token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
