import "./style.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li onClick={() => navigate("/")}>Add Category</li>
        <li onClick={() => navigate("/addProduct")}>Add Product</li>
        <li onClick={() => navigate("/items")}>All Items</li>
      </ul>
    </div>
  );
};

export default NavBar;
