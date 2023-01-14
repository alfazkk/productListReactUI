import "./style.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import request from "../../api";
import { useEffect, useState } from "react";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await request("/category/all");
        setCategories(data);
      } catch (error) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <NavBar />
      <div className="listCategory">
        <div>
          <h1>Categories</h1>
          {categories?.map((cat) => {
            if (cat?.parentId === null) {
              return (
                <p
                  onClick={() => navigate(`/items/${cat._id}`)}
                  className="listCategory-item"
                >
                  {cat.title}
                </p>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default ListCategory;
