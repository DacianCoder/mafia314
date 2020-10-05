import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import counterReducer from './reducers/counterReducer'

const store = configureStore({
  reducer: combineReducers({
    counterReducer,
  }),
})

export default store

export type IStore = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, IStore, null, Action<string>>
