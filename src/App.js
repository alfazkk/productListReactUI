import AddCategory from "./pages/addCategory";
import AddProduct from "./pages/addProduct";
import GetCategory from "./pages/getCategory";
import ListCategory from "./pages/listCategory";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AddCategory />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/items" element={<ListCategory />} />
          <Route path="/items/:id" element={<GetCategory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
