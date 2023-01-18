import { AnyAction, createSlice, Dispatch, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { IAuthor } from "../models/IAuthor";
import { AppThunk, RootState } from "../store";



interface AuthorsState {
    authors: IAuthor[];
}

const initialState: AuthorsState = {
  authors: [],
};

const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setAuthors: (state, action: PayloadAction<IAuthor[]>) => {
      state.authors = action.payload;
    },
  },
});

export const { setAuthors} = authorSlice.actions;

export default authorSlice.reducer;


export const fetchAuthors = (): AppThunk => {
  return async (dispatch: Dispatch) => {

  try {
    const response = await fetch('https://localhost:7109/api/EBookAPI/author');
    const authors: IAuthor[] = await response.json();
    
    dispatch(setAuthors(authors));
  } catch (err) {
    console.error(err);
  }
}};


// export const getAuthor = (state: RootState, ids: number[]): IAuthor[] | undefined => {
//   if(!ids){
//     return undefined;
//   }
//   const authors = state.authorSlice.authors.filter((author) => ids.includes(author.id));
//   if (authors.length === 0) {
//     return undefined;
//   }
//   return authors;
// };
