import { IBooks } from "@/types/globalTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IWish {
  books: IBooks[];
}

const initialState: IWish = {
  books: [],
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IBooks>) => {
      // Check if the book is already in the wishlist
      const existingBook = state.books.find(
        (book) => book.id === action.payload.id
      );
      if (!existingBook) {
        // If not, add it to the wishlist
        state.books.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      // Find the index of the book to remove by its ID
      const index = state.books.findIndex((book) => book.id === action.payload);
      if (index !== -1) {
        // If found, remove it from the wishlist
        state.books.splice(index, 1);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishSlice.actions;

export default wishSlice.reducer;
