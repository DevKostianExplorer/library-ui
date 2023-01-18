import { AnyAction, createSlice, Dispatch, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { ILanguage } from "../models/ILanguage";
import { AppThunk, RootState } from "../store";



interface LanguagesState {
  languages: ILanguage[];
}

const initialState: LanguagesState = {
  languages: [],
};

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setLanguages: (state, action: PayloadAction<ILanguage[]>) => {
      state.languages = action.payload;
    },
  },
});

export const { setLanguages} = languageSlice.actions;

export default languageSlice.reducer;


export const fetchLanguages = (): AppThunk => {
  return async (dispatch: Dispatch) => {

  try {
    const response = await fetch('https://localhost:7109/api/EBookAPI/language');
    const languages: ILanguage[] = await response.json();
    
    dispatch(setLanguages(languages));
  } catch (err) {
    console.error(err);
  }
}};

// export const getLanguage = (state: RootState, id: number): ILanguage | undefined => {
//   return state.languageSlice.languages.find((language) => language.id == id);
// };