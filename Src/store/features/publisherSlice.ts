import { AnyAction, createSlice, Dispatch, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { IPublisher } from "../models/IPublisher";
import { AppThunk, RootState } from "../store";



interface PublishersState {
    publishers: IPublisher[];
}

const initialState: PublishersState = {
    publishers: [],
};

const publisherSlice = createSlice({
  name: "publishers",
  initialState,
  reducers: {
    setPublishers: (state, action: PayloadAction<IPublisher[]>) => {
      state.publishers = action.payload;
    },
  },
});

export const { setPublishers} = publisherSlice.actions;

export default publisherSlice.reducer;


export const fetchPublishers = (): AppThunk => {
  return async (dispatch: Dispatch) => {

  try {
    const response = await fetch('https://localhost:7109/api/EBookAPI/publisher');
    const publishers: IPublisher[] = await response.json();
    
    dispatch(setPublishers(publishers));
  } catch (err) {
    console.error(err);
  }
}};


export const getPublisher = (state: RootState, id: number): IPublisher | undefined => {
  return state.publisherSlice.publishers.find((publisher) => publisher.id == id);
};
