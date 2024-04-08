import React from "react";
import { GetTodosDTO } from "../../api/dto/get-todos.dto";
import { TodoItem } from "../TodoItem";

type TodoListProps = {
  data: GetTodosDTO;
};

const TodoList: React.FC<TodoListProps> = ({ data }) => {
  if (!data.length) return <div className="empty">Список пуст</div>;

  return (
    <div className="todo-list">
      {data.map((item, index) => (
        <TodoItem
          data={item}
          prev={data[index - 1]}
          next={data[index + 1]}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
