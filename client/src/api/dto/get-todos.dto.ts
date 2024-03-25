export type Todo = {
    id: number;
    title: string;
    status: boolean;
    order: number;
    description?: string;
    parentId?: number;
    children?: Todo[];
}

export type GetTodosDTO = Todo[];