import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    emptyCart: (state) => {
        state.value = 0;
    }
  },
})

export const { increment, decrement, emptyCart } = cartSlice.actions

export default cartSlice.reducer