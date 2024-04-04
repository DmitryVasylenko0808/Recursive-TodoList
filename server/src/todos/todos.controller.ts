import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AddTodoDTO } from './dto/add-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { ToggleTodoDTO } from './dto/toggle-todo.dto';
import { SwapTodosDTO } from './dto/swap-todos.dto';

@Controller('api')
export class TodosController {
    constructor(private todosService: TodosService) {}

    @Get()
    async getAll() {
        return this.todosService.getAll();
    }

    @Post()
    async add(@Body() body: AddTodoDTO) {
        return this.todosService.add(body);
    } 

    @Patch(":id")
    async edit(@Body() body: EditTodoDTO, @Param("id") id: number) {
        return this.todosService.edit(body, id);
    }

    @Patch("toggle/:id") 
    async toggle(@Body() body: ToggleTodoDTO, @Param("id") id: number) {
        return this.todosService.toggle(body, id);
    }

    @Patch("swap/:firstId/:secondId") 
    async swap(@Param() params: SwapTodosDTO) {
        return this.todosService.swap(params.firstId, params.secondId)
    }

    @Delete(":id")
    async delete(@Param("id") id: number) {
        return this.todosService.delete(id);
    }
}
