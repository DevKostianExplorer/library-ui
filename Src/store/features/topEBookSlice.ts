import { AnyAction, createSlice, Dispatch, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { ITopEBook } from "../models/ITopEBook";



export interface TopEBookState {
  topEBooks: ITopEBook[];
}

const initialState: TopEBookState = {
  topEBooks: [],
};

const topEBookSlice = createSlice({
  name: "topEBooks",
  initialState,
  reducers: {
    setTopEBooks: (state, action: PayloadAction<ITopEBook[]>) => {
      state.topEBooks = action.payload;
    },
  },
});

export const { setTopEBooks} = topEBookSlice.actions;

export default topEBookSlice.reducer;


export const fetchTopEBooks = (number: number, type: 'rating' | 'downloads' | 'views'): AppThunk => {
  return async (dispatch: Dispatch) => {
    let fetchString: string = ""
    switch (type) {
      case 'rating':
        fetchString = `https://localhost:7109/api/EBookAPI/top/rating?limit=${number}`
        break;
      case 'downloads':
        fetchString = `https://localhost:7109/api/EBookAPI/top/downloads?limit=${number}`
        break;
      case 'views':
        fetchString = `https://localhost:7109/api/EBookAPI/top/views?limit=${number}`
        break;
    }
  try {
    const response = await fetch(fetchString);
    const topEBooks: ITopEBook[] = await response.json();
    
    dispatch(setTopEBooks(topEBooks));
  } catch (err) {
    console.error(err);
  }
}};
