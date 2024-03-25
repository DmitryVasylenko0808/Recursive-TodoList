import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddTodoDTO  {
    @IsNotEmpty({ message: "Заголовок не должен быть пустым" })
    title: string;

    @IsString()
    description?: string;

    @IsNumber()
    parentId?: number;
}