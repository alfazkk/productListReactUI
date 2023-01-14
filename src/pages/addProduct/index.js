import { useEffect, useState } from "react";
import request from "../../api";
import NavBar from "../../component/NavBar";
import "../addCategory/style.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await request("/category/all");
        setCategories(data);
      } catch (error) {
        setCategories([]);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await request("/product/all");
        setProducts(data);
      } catch (error) {
        setProducts([]);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (title && category) {
      const data = {
        title,
        category,
      };
      try {
        await request.post("/product/add", data);
        setProducts((prev) => [...prev, data]);
      } catch (error) {
        setProducts((prev) => prev);
      }
      setTitle("");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="containerInput">
          <form action="">
            <h2>Add Product</h2>
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="">Category</label>
            <select
              name="category"
              id=""
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={null}>Choose</option>
              {categories?.map((cat) => (
                <option value={cat.id}>{cat.title}</option>
              ))}
            </select>
            <button type="submit" onClick={(e) => submit(e)}>
              Submit
            </button>
          </form>
        </div>
        <div className="itemList">
          <h1>Products</h1>
          {products?.map((prod) => (
            <p className="itemList-item">{prod.title}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
