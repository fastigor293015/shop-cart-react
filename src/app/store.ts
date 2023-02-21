import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import cartSlice from "../features/cart/cartSlice";
import counterSlice from "../features/counter/counterSlice";
import paymentDataSlice from "../features/paymentData/paymentDataSlice";
import productsSlice from "../features/products/productsSlice";
import themeSlice from "../features/theme/themeSlice";

const rootReducer = combineReducers({
  theme: themeSlice,
  counter: counterSlice,
  products: productsSlice,
  cart: cartSlice,
  paymentData: paymentDataSlice,
})

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
