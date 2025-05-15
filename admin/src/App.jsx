import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState("");
  const handleToken = (token) => {
    setToken(token);
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login handleToken={handleToken} />
      ) : (
        <>
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/order" element={<Order />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
