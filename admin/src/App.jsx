import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <hr />
      <div className="flex w-full">
        <Sidebar />
      </div>
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/list" element={<List />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </div>
  );
}

export default App;
