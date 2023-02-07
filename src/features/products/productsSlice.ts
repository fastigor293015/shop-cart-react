import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};
export interface ProductsState {
  list: IProduct[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
      rejectWithValue("Server Error!");
    }

    return await res.json();
  }
)

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // setProducts: (state, action: PayloadAction<IProduct[]>) => {
    //   state.list = [...action.payload];
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
  }
})

// export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
