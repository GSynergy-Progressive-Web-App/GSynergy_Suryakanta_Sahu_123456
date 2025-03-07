import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataRow {
  store: string;
  sku: string;
  price: number;
  cost: number;
  [key: string]: string | number;
}

interface UpdateSalesUnitsPayload {
  rowIndex: number;
  week: string;
  value: number;
}

interface DataState {
  data: DataRow[];
}

const generateInitialData = (): DataRow[] => {
  return Array.from({ length: 50 }, (_, index) => {
    const price = parseFloat((Math.random() * 100 + 10).toFixed(2));
    const cost = parseFloat((Math.random() * 50 + 5).toFixed(2));

    const row: DataRow = {
      store: `Store-${index + 1}`,
      sku: `SKU-${(index % 10) + 1}`,
      price,
      cost,
    };

    // Generate sales units dynamically
    for (let i = 1; i <= 12; i++) {
      const week = `W${i.toString().padStart(2, "0")}`;
      row[`${week}_salesUnits`] = Math.floor(Math.random() * 200);
    }

    return row;
  });
};

const initialState: DataState = {
  data: generateInitialData(),
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateSalesUnits: (state, action: PayloadAction<UpdateSalesUnitsPayload>) => {
      const { rowIndex, week, value } = action.payload;
      state.data[rowIndex][`${week}_salesUnits`] = value;
    },
  },
});

export const { updateSalesUnits } = dataSlice.actions;
export default dataSlice.reducer;
