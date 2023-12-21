import axios from "axios";

export const allCategoriesRequest = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/categories");
    return res.data.data.categories;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const categoryByIDRequest = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/categories/${id}`);
    return res.data.data.category;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const SubcategoriesByCategoryRequest = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/subcategories?category=${id}`
    );
    return res.data.data.subcategories;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const subcategoryByIDRequest = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/subcategories/${id}`
    );
    return res.data.data.subcategory;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AllProductsRequest = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/products");
    return {
      products: response.data.data.products,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createProductRequest = async (newProduct) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/products",
      newProduct,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data.data.product);
    return {
      product: response.data.data.product,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
