import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import request from "../../api";
import NavBar from "../../component/NavBar";
import "./style.css";

const GetCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [subCats, setSubCats] = useState([]);
  const [subProds, setSubProds] = useState([]);

  const [catForm, setcatForm] = useState(false);
  const [prodForm, setProdForm] = useState(false);
  const [catTitle, setCatTitle] = useState("");
  const [prodTitle, setProdTitle] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await request(`/category/${id}`);
        setCategory(data.category);
        setSubCats(data.subCategories);
        setSubProds(data.products);
      } catch (error) {
        setCategory(category);
        setSubCats(subCats);
        setSubProds(subProds);
      }
    };
    fetchCategory();
  }, [id]);

  const addCat = async (e) => {
    e.preventDefault();
    if (catTitle) {
      const data = {
        title: catTitle,
        parentId: id,
      };
      try {
        await request.post("/category/add", data);
        setSubCats((prev) => [...prev, data]);
      } catch (error) {
        setSubCats(subCats);
      }
      setCatTitle("");
    }
  };

  const addProd = async (e) => {
    e.preventDefault();
    if (prodTitle) {
      const data = {
        title: prodTitle,
        category: id,
      };
      try {
        await request.post("/product/add", data);
        setSubProds((prev) => [...prev, data]);
      } catch (error) {
        setSubProds(subProds);
      }
      setProdTitle("");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="itemsContainer">
        <h2>{category.title}</h2>
        <p>Subcategories</p>
        <button onClick={() => setcatForm(!catForm)}>Add</button>
        {catForm && (
          <form>
            <input
              type="text"
              placeholder="Add Subcategory"
              value={catTitle}
              onChange={(e) => setCatTitle(e.target.value)}
            />
            <button type="submit" onClick={(e) => addCat(e)}>
              Submit
            </button>
          </form>
        )}
        <div className="subCatItems">
          {subCats?.map((cat) => (
            <span onClick={() => navigate(`/items/${cat._id}`)}>
              {cat.title}
            </span>
          ))}
        </div>

        <p>Products</p>
        <button onClick={() => setProdForm(!prodForm)}>Add</button>
        {prodForm && (
          <form>
            <input
              type="text"
              placeholder="Add product"
              value={prodTitle}
              onChange={(e) => setProdTitle(e.target.value)}
            />
            <button type="submit" onClick={(e) => addProd(e)}>
              Submit
            </button>
          </form>
        )}
        <div className="prodItems">
          {subProds?.map((prod) => (
            <p>{prod.title}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetCategory;
