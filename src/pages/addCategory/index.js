import { useEffect, useState } from "react";
import NavBar from "../../component/NavBar";
import "./style.css";
import request from "../../api";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);

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

  const submit = async (e) => {
    e.preventDefault();
    if (title) {
      const data = {
        title,
        parentId: null,
      };
      try {
        await request.post("/category/add", data);
        setCategories((prev) => [...prev, data]);
      } catch (error) {
        setCategories((prev) => prev);
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
            <h2>Add Category</h2>
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" onClick={(e) => submit(e)}>
              Submit
            </button>
          </form>
        </div>
        <div className="itemList">
          <h1>Categories</h1>
          {categories?.map((cat) => {
            if (cat?.parentId === null) {
              return <p className="itemList-item">{cat.title}</p>;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default AddCategory;
