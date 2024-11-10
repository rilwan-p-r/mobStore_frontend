import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    cartCount: number;
    cartTotal: number;
}

const initialState: CartState = {
    cartCount: 0,
    cartTotal: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartInfo: (state, action: PayloadAction<{ count: number; total: number }>) => {
            state.cartCount = action.payload.count;
            state.cartTotal = action.payload.total;
        },
        clearCart: (state) => {
            state.cartCount = 0;
            state.cartTotal = 0;
        }
    }
});

export const { setCartInfo, clearCart } = cartSlice.actions;
export default cartSlice.reducer;