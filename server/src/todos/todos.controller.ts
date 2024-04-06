import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AddTodoDTO } from './dto/add-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { ToggleTodoDTO } from './dto/toggle-todo.dto';
import { Todo } from '@prisma/client';

@Controller("todos")
export class TodosController {
    constructor(private todosService: TodosService) {}

    @Get()
    async getAll(): Promise<Todo[]> {
        return this.todosService.getAll();
    }

    @Post()
    async add(@Body() body: AddTodoDTO): Promise<void> {
        return this.todosService.add(body);
    } 

    @Patch(":id")
    @HttpCode(204)
    async edit(@Body() body: EditTodoDTO, @Param("id") id: number): Promise<void> {
        return this.todosService.edit(body, id);
    }

    @Patch(":id/toggle") 
    @HttpCode(204)
    async toggle(@Body() body: ToggleTodoDTO, @Param("id") id: number): Promise<void> {
        return this.todosService.toggle(body, id);
    }

    @Patch(":id/swap") 
    @HttpCode(204)
    async swap(@Param("id") id: number, @Body("siblingId") siblingId: number): Promise<void> {
        return this.todosService.swap(id, siblingId)
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: number): Promise<void> {
        return this.todosService.delete(id);
    }
}
