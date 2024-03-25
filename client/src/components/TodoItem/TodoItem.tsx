import React, { useState } from "react";
import { Todo } from "../../api/dto/get-todos.dto";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { ModalTodoForm } from "../ModalTodoForm";
import {
  useDeleteTodoMutation,
  useSwapTodosMutation,
  useToggleTodoMutation,
} from "../../api/todosApi";

type TodoItemProps = {
  data: Todo;
  isFirst: boolean;
  isLast: boolean;
  prev?: Todo;
  next?: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({
  data,
  isFirst,
  isLast,
  prev,
  next,
}) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const [swapTodos] = useSwapTodosMutation();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [editMode, setIsEditMode] = useState<boolean>(false);

  const handleOpenModal = (mode: boolean) => {
    setIsOpenModal(true);
    setIsEditMode(mode);
  };
  const handleCloseModal = () => setIsOpenModal(false);

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  const handleToggleTodo = (value: boolean) => {
    const patchData = {
      id: data.id,
      data: { value },
    };

    toggleTodo(patchData);
  };

  const handleSwap = (sibling?: Todo) => {
    if (sibling) {
      const firstId = data.id;
      const secondId = sibling.id;
      swapTodos({ firstId, secondId });
    }
  };

  return (
    <>
      <div className="todo-item">
        <div className="todo-content">
          <label className="checkbox-container" aria-label="status">
            <input
              type="checkbox"
              className="checkbox-container__checkbox"
              checked={data.status}
              onChange={(e) => handleToggleTodo(e.target.checked)}
            />
            <span className="checkbox-container__checkmark"></span>
          </label>
          <div className="todo-text">
            <h2 className="todo-title">{data.title}</h2>
          </div>
          <div className="btn-container">
            <button
              className="btn-todo"
              onClick={() => handleSwap(next)}
              disabled={isLast}
              aria-label="down"
            >
              <RiArrowDownSFill />
            </button>
            <button
              className="btn-todo"
              onClick={() => handleSwap(prev)}
              disabled={isFirst}
              aria-label="up"
            >
              <RiArrowUpSFill />
            </button>
            <button
              className="btn-todo"
              onClick={() => handleOpenModal(false)}
              aria-label="add"
            >
              <AiOutlinePlus />
            </button>
            <button
              className="btn-todo"
              onClick={() => handleOpenModal(true)}
              aria-label="edit"
            >
              <AiOutlineEdit />
            </button>
            <button
              className="btn-todo"
              onClick={() => handleDeleteTodo(data.id)}
              aria-label="delete"
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
        {data.description && <p className="todo-desc">{data.description}</p>}
        {data.children?.map((child, index) => (
          <TodoItem
            data={child}
            prev={data.children && data.children[index - 1]}
            next={data.children && data.children[index + 1]}
            isFirst={index === 0}
            isLast={index === (data.children ? data.children.length - 1 : 0)}
            key={child.id}
          />
        ))}
      </div>
      {isOpenModal && (
        <ModalTodoForm
          data={data}
          editMode={editMode}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TodoItem;
