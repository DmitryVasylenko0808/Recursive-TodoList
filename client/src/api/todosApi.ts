import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetTodosDTO } from "./dto/get-todos.dto";

type AddTodoParams = {
    title: string;
    description?: string;
    parentId?: number;
}

type EditTodoParams = {
    id: number;
    title: string;
    description?: string;
}

type ToogleTodoParams = {
    id: number;
    data: { value: boolean };
}

type SwapTodosParams = {
    firstId: number;
    secondId: number;
}

export const todosApi = createApi({
    reducerPath: "todosApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api"
    }),
    endpoints: builder => ({
        getTodos: builder.query<GetTodosDTO, void>({
            query: () => "/",
            providesTags: ["Todo"]
        }),
        addTodo: builder.mutation<void, AddTodoParams>({
            query: body => ({
                url: "/",
                method: "POST",
                body
            }),
            invalidatesTags: ["Todo"]
        }),
        editTodo: builder.mutation<void, EditTodoParams>({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
                method: "PATCH",
                body: patch
            }),
            invalidatesTags: ["Todo"]
        }),
        deleteTodo: builder.mutation<void, number>({
            query: id => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Todo"]
        }),
        toggleTodo: builder.mutation<void, ToogleTodoParams>({
            query: ({ id, data }) => ({
                url: `/toggle/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Todo"]
        }),
        swapTodos: builder.mutation<void, SwapTodosParams>({
            query: ({ firstId, secondId }) => ({
                url: `/swap/${firstId}/${secondId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["Todo"]
        })
    }),
    tagTypes: ["Todo"]
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useEditTodoMutation,
    useDeleteTodoMutation,
    useToggleTodoMutation,
    useSwapTodosMutation
} = todosApi;