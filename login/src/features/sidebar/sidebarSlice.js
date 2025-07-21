import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    activeItem: 'Dashboard',
    items: [
      { id: 'Dashboard', checked: false },
      { id: 'Categories', checked: false },
      { id: 'Prodcut', checked: true },
      { id: 'Logout', checked: false },
    ]
  },
  reducers: {
    toggleItem: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.checked = !item.checked;
        if (item.checked) {
          state.activeItem = item.id;
        }
      }
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    }
  }
});

export const { toggleItem, setActiveItem } = sidebarSlice.actions;
export default sidebarSlice.reducer;