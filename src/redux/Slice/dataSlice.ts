import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalesUpdatePayload {
  rowIndex: number;
  value: number;
  week: string;
}

interface DataItem {
  store: string;
  sku: string;
  price: number;
  cost: number;
  [key: string]: string | number;
}

interface DataState {
  data: DataItem[];
}

const generateRandomData = (): DataItem[] => {
  const stores = ['Store A', 'Store B', 'Store C', 'Store D', 'Store E'];
  const skus = ['SKU-101', 'SKU-102', 'SKU-103', 'SKU-104', 'SKU-105'];

  const weeks = Array.from({ length: 12 }, (_, i) => `Week${(i + 1).toString().padStart(2, '0')}`);

  return Array.from({ length: 50 }, () => {
    const store = stores[Math.floor(Math.random() * stores.length)];
    const sku = skus[Math.floor(Math.random() * skus.length)];
    const price = parseFloat((Math.random() * 50 + 10).toFixed(2));
    const cost = parseFloat((price * (Math.random() * 0.7)).toFixed(2));

    const weekData = weeks.reduce((acc, week) => {
      acc[`${week}_salesUnits`] = Math.floor(Math.random() * 100);
      return acc;
    }, {} as Record<string, number>);

    return {
      store,
      sku,
      price,
      cost,
      ...weekData,
    };
  });
};

const initialState: DataState = {
  data: generateRandomData(),
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    updateSalesUnits: (state, action: PayloadAction<SalesUpdatePayload>) => {
      const { rowIndex, value, week } = action.payload;
      if (state.data[rowIndex]) {
        state.data[rowIndex][`${week}_salesUnits`] = value;
      }
    },
  },
});

export const { updateSalesUnits } = dataSlice.actions;
export default dataSlice.reducer;
