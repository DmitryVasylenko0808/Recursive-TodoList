import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todosApi } from "../api/todosApi";

export const store = configureStore({
    reducer: {
        [todosApi.reducerPath]: todosApi.reducer
    },
    middleware: (getDefaultMiddeware) => getDefaultMiddeware()
        .concat(todosApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;