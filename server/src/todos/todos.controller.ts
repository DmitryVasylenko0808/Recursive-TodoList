import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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
    async edit(@Body() body: EditTodoDTO, @Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.todosService.edit(body, id);
    }

    @Patch(":id/toggle") 
    async toggle(@Body() body: ToggleTodoDTO, @Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.todosService.toggle(body, id);
    }

    @Patch(":id/swap") 
    async swap(@Param("id", ParseIntPipe) id: number, @Body("siblingId") siblingId: number): Promise<void> {
        return this.todosService.swap(id, siblingId)
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.todosService.delete(id);
    }
}
