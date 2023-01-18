import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { API } from "../services/EBookService";
import { topEBookAPI } from "../services/TopEBookService";
import authorSlice from "./features/authorSlice";
import eBookSlice from "./features/eBookSlice";
import genreSlice from "./features/genreSlice";
import languageSlice from "./features/languageSlice";
import publisherSlice from "./features/publisherSlice";
import topEBookSlice from "./features/topEBookSlice";

const rootReducer = combineReducers({
  // genreSlice,
  // authorSlice,
  // publisherSlice,
  // languageSlice,
  // eBookSlice,
  // topEBookSlice,
  [API.reducerPath]: API.reducer
})

export const setupStore = () => {
  return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware()
          .concat(API.middleware)
  })
}

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
//   // any other middleware or enhancers
// });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

// export default store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
