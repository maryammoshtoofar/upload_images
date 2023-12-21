import "./App.css";
import { useFormik } from "formik";
import { number, object, string } from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/features/categoriesSlice";
import { fetchSubcategories } from "./redux/features/subCategoriesSlice";
import { AddProduct, fetchProducts } from "./redux/features/productsSlice";
import TableRow from "./components/TableRow";
import { getFormData } from "./utils";

function App() {
  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, []);

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState(null);

  function handleCategoryChange(e) {
    dispatch(fetchSubcategories(e.currentTarget.value));
    formik.setFieldValue("category", e.currentTarget.value);
  }

  function handleSubmit(values) {
    const formData = getFormData(values);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (images)
      images.forEach((image) => {
        formData.append("images", image);
      });
    dispatch(AddProduct(formData));
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      subcategory: "",
      category: "",
      quantity: "",
      brand: "",
      description: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <input
          name="name"
          id="name"
          type="text"
          placeholder={"name"}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <input
          name="price"
          id="price"
          type="number"
          placeholder={"price"}
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <select
          name="category"
          id="category"
          value={formik.values.category}
          onChange={handleCategoryChange}
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          name="subcategory"
          id="subcategory"
          value={formik.values.subcategory}
          onChange={formik.handleChange}
        >
          <option>Select a Subcategory</option>
          {subcategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder={"quantity"}
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <input
          type="text"
          id="brand"
          name="brand"
          placeholder={"brand"}
          value={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="thumbnail">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          id="thumbnail"
          name="thumbnail"
          filename={thumbnail}
          onChange={(event) => setThumbnail(event.target.files[0])}
        />
        <input
          type="text"
          id="description"
          name="description"
          placeholder={"description"}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="images">Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          id="images"
          name="images"
          filename={images}
          onChange={(event) => setImages(Array.from(event.target.files))}
        />
        <button type="submit">Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>THUMBNAIL</th>
            <th>IMAGES</th>
            <th>NAME</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow product={product} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
