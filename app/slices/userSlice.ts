import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  name: string | null;
  age: number | null;
}

const initialUserData: UserData = {
  name: null,
  age: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserData,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      const data = action.payload;
      state.name = data.name;
      state.age = data.age;
    },
  },
});

export const {
  setUserData
} = userSlice.actions

export default userSlice.reducer;

export const showDataUser = (state: any) => state?.user