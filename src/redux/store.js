import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./features/categoriesSlice";
import productsSlice from "./features/productsSlice";
import subCategoriesSlice from "./features/subCategoriesSlice";

export default configureStore({
  reducer: {
    categories: categoriesSlice,
    subcategories: subCategoriesSlice,
    products: productsSlice,
  },
});
