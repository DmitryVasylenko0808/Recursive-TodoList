import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AddTodoDTO } from './dto/add-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { ToggleTodoDTO } from './dto/toggle-todo.dto';
import { SwapTodosDTO } from './dto/swap-todos.dto';
import { Todo } from '@prisma/client';

@Controller('api')
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

    @Patch("toggle/:id") 
    @HttpCode(204)
    async toggle(@Body() body: ToggleTodoDTO, @Param("id") id: number): Promise<void> {
        return this.todosService.toggle(body, id);
    }

    @Patch("swap/:firstId/:secondId") 
    @HttpCode(204)
    async swap(@Param() params: SwapTodosDTO): Promise<void> {
        return this.todosService.swap(params.firstId, params.secondId)
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: number): Promise<void> {
        return this.todosService.delete(id);
    }
}
