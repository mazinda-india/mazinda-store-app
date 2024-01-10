import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Action
export const fetchStoreData = createAsyncThunk("fetchStore", async () => {
    const store_token = await AsyncStorage.getItem("store_token");
    if (!store_token) {
        return;
    }
    const { data } = await axios.post("https://store.mazinda.com/api/fetch-store", {
        store_token,
    });

    const product_response = await axios.post('https://store.mazinda.com/api/product/fetch-store-products', {
        storeToken: store_token,
    });

    return { store: data.store, products: product_response.data.products };
});

export const StoreSlice = createSlice({
    name: "store",
    initialState: {
        isLoading: false,
        isError: false,
        store_token: null,
        store: {},
        products: [],
    },
    prepare: async () => {
        const store_token = await AsyncStorage.getItem("store_token");
        return { payload: store_token || null };
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStoreData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchStoreData.fulfilled, (state, action) => {
            (state.isLoading = false), (state.store = action.payload.store), (state.products = action.payload.products)
        });
        builder.addCase(fetchStoreData.rejected, (state, action) => {
            (state.isLoading = false), (state.isError = true);
        });
    },
});

export default StoreSlice.reducer;