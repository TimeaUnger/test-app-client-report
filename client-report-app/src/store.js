import { configureStore } from "@reduxjs/toolkit";
import  { clientsSlice } from "./services/clientsApi";

export const store = configureStore({
    reducer: {
      [clientsSlice.reducerPath]: clientsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(clientsSlice.middleware)
})

