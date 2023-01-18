import { AnyAction, createSlice, Dispatch, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { IGenre } from "../models/IGenre";
import { AppThunk, RootState } from "../store";



interface GenresState {
    genres: IGenre[];
}

const initialState: GenresState = {
    genres: [],
};

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<IGenre[]>) => {
      state.genres = action.payload;
    },
  },
});

export const { setGenres} = genreSlice.actions;

export default genreSlice.reducer;


export const fetchGenres = (): AppThunk => {
  return async (dispatch: Dispatch) => {

  try {
    const response = await fetch('https://localhost:7109/api/EBookAPI/genre');
    const genres: IGenre[] = await response.json();
    
    dispatch(setGenres(genres));
  } catch (err) {
    console.error(err);
  }
}};

export const getGenre = (state: RootState, ids: number[]): IGenre[] | undefined => {
  if(!ids){
    return undefined;
  }
  const genres = state.genreSlice.genres.filter((genre) => ids.includes(genre.id));
  if (genres.length === 0) {
    return undefined;
  }
  return genres;
};
