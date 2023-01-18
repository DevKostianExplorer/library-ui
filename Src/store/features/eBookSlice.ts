import { AnyAction, createSlice, Dispatch, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { MultiValue } from "react-select";
import { AuthorOption, GenreOption } from "../../pages/Components/Filter/Filter";
import { IEBook } from "../models/IEBook";
import { AppThunk, RootState } from "../store";



export interface EBookState {
    eBooks: IEBook[];
}

const initialState: EBookState = {
  eBooks: [],
};

const eBookSlice = createSlice({
  name: "eBooks",
  initialState,
  reducers: {
    setEBooks: (state, action: PayloadAction<IEBook[]>) => {
      state.eBooks = action.payload;
    },
  },
});

export const { setEBooks} = eBookSlice.actions;

export default eBookSlice.reducer;

export const fetchEBooks = (
  offset: number,
  limit: number,
  searchQuery: string,
  genreOptions: MultiValue<GenreOption>,
  authorOptions: MultiValue<AuthorOption>
): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      // construct the URL
      let url = `https://localhost:7109/api/EBookAPI/e_book?from=${offset}&to=${limit}`;
      
      // if search query exists add it to the URL
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      // if filter options exists add it to the URL
      if (genreOptions && genreOptions.length > 0) {
        console.log(genreOptions)
        url += `&genreFilter=${genreOptions.map((option) => option.id).join(',')}`;
      }

      const response = await fetch(url);
      const eBooks: IEBook[] = await response.json();

      dispatch(setEBooks(eBooks));
    } catch (err) {
      console.error(err);
    }
  };
};



// export const fetchEBooks = (from: number, to: number): AppThunk => {
//   return async (dispatch: Dispatch) => {

//   try {
//     const response = await fetch(`https://localhost:7109/api/EBookAPI/e_book?from=${from}&to=${to}`);
//     const eBooks: EBook[] = await response.json();
    
//     dispatch(setEBooks(eBooks));
//   } catch (err) {
//     console.error(err);
//   }
// }};


