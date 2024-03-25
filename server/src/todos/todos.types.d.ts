import { Todo } from "@prisma/client";

export type TodoWithChildren = Todo & { children?: Todo[] }