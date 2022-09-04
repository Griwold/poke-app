import { configureStore, Middleware } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk'

import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middlewares/logger'
import rootReducers from '../reducers/index';
// ...


const middlewares: Middleware[] = [thunkMiddleware, loggerMiddleware];
const enhancers: any[] = [monitorReducersEnhancer];

export const makeStore = () => configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
})


export type AppStore = ReturnType<typeof makeStore> 
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore);