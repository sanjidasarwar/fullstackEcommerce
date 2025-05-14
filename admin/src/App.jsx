import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";

function App() {
  return (
    <Routes>
      <Route path="/add" element={<Add />} />
      <Route path="/list" element={<List />} />
      <Route path="/order" element={<Order />} />
    </Routes>
  );
}

export default App;
