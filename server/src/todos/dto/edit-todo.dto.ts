import { IsNotEmpty, IsString } from "class-validator"

export class EditTodoDTO  {
    @IsNotEmpty({ message: "Заголовок не должен быть пустым" })
    title: string;

    @IsString()
    description?: string
}