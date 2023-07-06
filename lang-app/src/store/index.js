import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slicers/theme";
export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
