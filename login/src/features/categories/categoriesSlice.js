/** @format */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: "1",
      name: "News",
      slug: "news",
      image: null,
    },
  ],
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryAdded: (state, action) => {
      state.categories.push(action.payload);
    },
    categoryUpdated: (state, action) => {
      const { id, name, slug, image } = action.payload;
      const existingCategory = state.categories.find(
        (category) => category.id === id
      );
      if (existingCategory) {
        existingCategory.name = name;
        existingCategory.slug = slug;
        existingCategory.image = image;
      }
    },
    categoryDeleted: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
  },
});

export const { categoryAdded, categoryUpdated, categoryDeleted } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;

export const selectAllCategories = (state) => state.categories.categories;
