/** @format */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: [
    {
      id: "1",
      name: "brand",
      slug: "brand",
      image: null,
    },
  ],
  status: "idle",
  error: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    brandAdded: (state, action) => {
      state.brand.push(action.payload);
    },
    brandUpdated: (state, action) => {
      const { id, name, slug, image } = action.payload;
      const existingBrand = state.brand.find((brand) => brand.id === id);
      if (existingBrand) {
        existingBrand.name = name;
        existingBrand.slug = slug;
        existingBrand.image = image;
      }
    },
    brandDeleted: (state, action) => {
      state.brand = state.brand.filter((brand) => brand.id !== action.payload);
    },
  },
});

export const { brandAdded, brandUpdated, brandDeleted } = brandSlice.actions;

export default brandSlice.reducer;

export const selectAllBrand = (state) => state.brand.brand;
