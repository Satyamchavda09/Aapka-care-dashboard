/** @format */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: "1",
      name: "Rolex",
      slug: "/Rolex",
      image: null,
    },
  ],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: (state, action) => {
      state.products.push(action.payload);
    },
    productUpdated: (state, action) => {
      const { id, name, slug, image } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.slug = slug;
        existingProduct.image = image;
      }
    },
    productDeleted: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { productAdded, productUpdated, productDeleted } =
  productSlice.actions;

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
