import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddTodoDTO  {
    @IsNotEmpty({ message: "Заголовок не должен быть пустым" })
    readonly title: string;

    @IsString()
    readonly description?: string;

    @IsNumber()
    readonly parentId?: number;
}