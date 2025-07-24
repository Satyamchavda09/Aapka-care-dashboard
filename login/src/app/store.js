/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import productsReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productsReducer,
    brand: brandReducer,
    sidebar: sidebarReducer
  },
});
