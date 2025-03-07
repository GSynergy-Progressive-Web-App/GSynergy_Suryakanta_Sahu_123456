import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Store {
  id: string;
  seqNo: number;
  label: string;
  city: string;
  state: string;
}

interface StoreState {
  stores: Store[];
  status: string;
}

const initialState: StoreState = {
  stores: [],
  status: "idle",
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    fetchStores: (state) => {
      state.status = "loading";
      state.stores = [
    { id: "ST035", seqNo: 1, label: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
    { id: "ST046", seqNo: 2, label: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
    { id: "ST064", seqNo: 3, label: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
    { id: "ST066", seqNo: 4, label: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
    { id: "ST073", seqNo: 5, label: "Nashville Melody Music Store", city: "Nashville", state: "TN" },
    { id: "ST074", seqNo: 6, label: "New York Empire Eats", city: "New York", state: "NY" },
    { id: "ST091", seqNo: 7, label: "Denver Peaks Outdoor", city: "Denver", state: "CO" },
    { id: "ST094", seqNo: 8, label: "Philadelphia Liberty Market", city: "Philadelphia", state: "PA" },
    { id: "ST097", seqNo: 9, label: "Boston Harbor Books", city: "Boston", state: "MA" },
    { id: "ST101", seqNo: 10, label: "Austin Vibe Co.", city: "Austin", state: "TX" },
    { id: "ST131", seqNo: 11, label: "Los Angeles Luxe", city: "Los Angeles", state: "CA" },
    { id: "ST150", seqNo: 12, label: "Houston Harvest Market", city: "Houston", state: "TX" },
    { id: "ST151", seqNo: 13, label: "Portland Evergreen Goods", city: "Portland", state: "OR" },
    { id: "ST156", seqNo: 14, label: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
    { id: "ST163", seqNo: 15, label: "Las Vegas Neon Treasures", city: "Las Vegas", state: "NV" },
    { id: "ST175", seqNo: 16, label: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
    { id: "ST176", seqNo: 17, label: "Miami Breeze Apparel", city: "Miami", state: "FL" },
    { id: "ST177", seqNo: 18, label: "San Diego Wave Surf Shop", city: "San Diego", state: "CA" },
    { id: "ST193", seqNo: 19, label: "Charlotte Queen’s Closet", city: "Charlotte", state: "NC" },
    { id: "ST208", seqNo: 20, label: "Detroit Motor Gear", city: "Detroit", state: "MI" }
];

      state.status = "success";
    },
    addStore: (state, action: PayloadAction<Store>) => {
      const newSeqNo = state.stores.length + 1;
      state.stores.push({ ...action.payload, seqNo: newSeqNo });
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.stores.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) state.stores[index] = action.payload;
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((s) => s.id !== action.payload);
      state.stores.forEach((store, index) => {
        store.seqNo = index + 1; // Reorder sequence numbers
      });
    },
    reorderStore: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload.map((store, index) => ({
        ...store,
        seqNo: index + 1,
      }));
    },
  },
});

export const { fetchStores, addStore, updateStore, deleteStore, reorderStore } =
  storeSlice.actions;

export default storeSlice.reducer;
