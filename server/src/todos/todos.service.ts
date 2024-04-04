import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Todo } from '@prisma/client';
import { AddTodoDTO } from './dto/add-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { ToggleTodoDTO } from './dto/toggle-todo.dto';

@Injectable()
export class TodosService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        const fetchedTodos = await this.prismaService.todo.findMany({ 
            orderBy: {
                parentId: "desc"
            }
        });

        if (!fetchedTodos.length) {
            return [];
        }
        
        const res = this.packingTodos(fetchedTodos);
        return res;
    }

    async add(data: AddTodoDTO) {
        const aggregations = await this.prismaService.todo.aggregate({
            where: { parentId: data.parentId },
            _count: { id: true }
        });

        await this.prismaService.todo.create({ 
            data: {
                ...data,
                order: aggregations._count.id + 1
            }
        })
    }

    async edit(data: EditTodoDTO, id: number) {
        await this.prismaService.todo.update({
            where: { id: Number(id) },
            data
        })
    }

    async toggle(data: ToggleTodoDTO, id: number) {
        const toggledTodo = await this.prismaService.todo.update({
            where: { id: Number(id) },
            data: {
                status: data.value
            },
        });

        if (toggledTodo.parentId && !data.value) {
            await this.prismaService.todo.update({
                where: { id: Number(toggledTodo.parentId) },
                data: {
                    status: data.value
                }
            });
        }

        await this.toggleTodoChildren([toggledTodo], data.value);
    }

    async delete(id: number) {
        await this.prismaService.todo.delete({ 
            where: { id: Number(id) }  
        });
    }

    async swap(firstId: number, secondId: number) {
        const firstTodo = await this.prismaService.todo.findUnique({
            where: { id: Number(firstId) }
        });
        const secondTodo = await this.prismaService.todo.findUnique({
            where: { id: Number(secondId) }
        });

        const updateFirst = this.prismaService.todo.update({
            where: { id: Number(firstId) },
            data: { order: secondTodo.order }
        });
        const updateSecond = this.prismaService.todo.update({
            where: { id: Number(secondId) },
            data: { order: firstTodo.order }
        });

        await this.prismaService.$transaction([updateFirst, updateSecond]);
    }

    private packingTodos(todos: Todo[], parentId?: number): Todo[] {
        parentId = parentId ?? todos[0].parentId;

        return todos
            .filter(item => item.parentId === parentId)
            .map(child => ({ ...child, children: this.packingTodos(todos, child.id) }))
            .sort((a, b) => b.order - a.order);
    }

    private async toggleTodoChildren(data: Todo[], value: boolean) {
        if (!data.length) {
            return;
        }

        data.forEach(async t => {
            await this.prismaService.todo.updateMany({
                where: { parentId: t.id },
                data: { status: value },
            });
        
            const todos = await this.prismaService.todo.findMany({
                where: { parentId: t.id }
            });
        
            if (todos.length) {
                await this.toggleTodoChildren(todos, value);
            }
        });
    }
}
