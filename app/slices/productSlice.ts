import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedProduct } from "@/interface/global";

const initialSelectedProduct: SelectedProduct[] = [];

const productSlice = createSlice({
  name: "product",
  initialState: initialSelectedProduct,
  reducers: {
    setProductData: (
      state,
      action: PayloadAction<SelectedProduct[] | undefined>
    ) => {
      const data = action.payload;
      if (data) {
        state.push(...data);
      }
    },
    clearSelectedProductData: (state = initialSelectedProduct) => {
      return initialSelectedProduct;
    }
      ,
  },
});

export const { setProductData, clearSelectedProductData } = productSlice.actions;

export default productSlice.reducer;
