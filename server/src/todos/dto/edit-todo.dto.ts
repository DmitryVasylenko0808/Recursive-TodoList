import { IsNotEmpty, IsString } from "class-validator"

export class EditTodoDTO  {
    @IsNotEmpty({ message: "Заголовок не должен быть пустым" })
    readonly title: string;

    @IsString()
    readonly description?: string
}