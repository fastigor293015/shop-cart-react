import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../products/productsSlice";

export interface ICartProduct extends IProduct {
  count: number;
};
export interface CartState {
  list: ICartProduct[];
  count: number;
  summary: number,
};

const initialState: CartState = {
  list: [],
  count: 0,
  summary: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IProduct>) => {
      if (!state.list) {
        const newItem: ICartProduct = { ...action.payload, count: 1 };
        state.list = [newItem];
        state.count++;
        state.summary += newItem.price;
      }
      const item = state.list?.find(item => item.id === action.payload.id);
      if (item) {
        item.count++;
        state.summary += item.price;
      } else {
        const newItem: ICartProduct = { ...action.payload, count: 1 };
        state.list.push(newItem);
        state.summary += newItem.price;
      }
      state.count++;
    },
    remove: (state, action: PayloadAction<IProduct>) => {
      if (state.count === 0) {
        return;
      }
      const item = state.list.find(item => item.id === action.payload.id);
      if (item) {
        item.count--;
        state.count--;
        state.summary -= item.price;
        if (item.count <= 0) {
          state.list.splice(state.list.indexOf(item), 1);
        }
      }
    },
    clear: (state) => {
      state.list = [];
      state.count = 0;
      state.summary = 0;
    }
  }
})

export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
