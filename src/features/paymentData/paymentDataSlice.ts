import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentData {
  name: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

const initialState: PaymentData = {
  name: "",
  cardNumber: "",
  expirationDate: "",
  cvv: "",
}

const paymentDataSlice = createSlice({
  name: "paymentData",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<PaymentData>) => {
      state.name = action.payload.name;
      state.cardNumber = action.payload.cardNumber;
      state.expirationDate = action.payload.expirationDate;
      state.cvv = action.payload.cvv;
    },
    clear: (state) => {
      state.name = "";
      state.cardNumber = "";
      state.expirationDate = "";
      state.cvv = "";
    }
  }
})

export const { set, clear } = paymentDataSlice.actions;
export default paymentDataSlice.reducer;
