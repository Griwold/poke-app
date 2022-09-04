import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';

import rootReducers from '../reducers/index';
// ...

export const makeStore = () => configureStore({
  reducer: rootReducers,
  devTools: true
})


export type AppStore = ReturnType<typeof makeStore> 
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore);