import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Sku {
  id: string;
  seqNo: number;
  label: string;
  class: string;
  price: string;
  cost: string;
}

interface SkuSliceState {
  sku: Sku[];
  status: string;
}

const initialState: SkuSliceState = {
  sku: [],
  status: "idle",
};

const skuSlice = createSlice({
  name: "sku",
  initialState,
  reducers: {
    fetchskuSlices: (state) => {
      state.status = "loading";
      state.sku = [
        { id: "SK00158", seqNo: 1, label: "Crew Neck Merino Wool Sweater", class: "Tops", price: "$114.99", cost: "$18.28" },
        { id: "SK00269", seqNo: 2, label: "Faux Leather Leggings", class: "Jewelry", price: "$9.99", cost: "$8.45" },
        { id: "SK00300", seqNo: 3, label: "Fleece-Lined Parka", class: "Jewelry", price: "$199.99", cost: "$17.80" },
        { id: "SK00304", seqNo: 4, label: "Cotton Polo Shirt", class: "Tops", price: "$139.99", cost: "$10.78" }
      ];
      state.status = "success";
    },
    addskuSlice: (state, action: PayloadAction<Sku>) => {
      const newSeqNo = state.sku.length + 1;
      state.sku.push({ ...action.payload, seqNo: newSeqNo });
    },
    updateskuSlice: (state, action: PayloadAction<Sku>) => {
      const index = state.sku.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) state.sku[index] = action.payload;
    },
    deleteskuSlice: (state, action: PayloadAction<string>) => {
      state.sku = state.sku.filter((s) => s.id !== action.payload);
      state.sku.forEach((skuSlice, index) => {
        skuSlice.seqNo = index + 1;
      });
    },
    reorderskuSlice: (state, action: PayloadAction<Sku[]>) => {
      state.sku = action.payload.map((skuSlice, index) => ({
        ...skuSlice,
        seqNo: index + 1,
      }));
    },
  },
});

export const { fetchskuSlices, addskuSlice, updateskuSlice, deleteskuSlice, reorderskuSlice } =
  skuSlice.actions;

export default skuSlice.reducer;
