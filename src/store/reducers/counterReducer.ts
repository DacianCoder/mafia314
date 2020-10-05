import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const counterReducer = createSlice({
  name: 'CounterReducer',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    incrementBy: (state, { payload }: PayloadAction<number>) => state + payload,
    decrement: (state) => state - 1,
  },
})

export const counterActions = counterReducer.actions

export default counterReducer.reducer
