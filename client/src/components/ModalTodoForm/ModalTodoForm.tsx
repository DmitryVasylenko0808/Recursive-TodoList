import React from "react";
import { AiOutlinePlus, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { Todo } from "../../api/dto/get-todos.dto";
import { useAddTodoMutation, useEditTodoMutation } from "../../api/todosApi";

type ModalTodoFormProps = {
  data: Todo;
  editMode?: boolean;
  onClose: () => void;
};

type ModalTodoFormFields = {
  title: { value: string };
  description?: { value: string };
};

const ModalTodoForm: React.FC<ModalTodoFormProps> = ({
  data,
  editMode = false,
  onClose,
}) => {
  const [addTodo, { isLoading: isAddTodoLoading }] = useAddTodoMutation();
  const [editTodo, { isLoading: isEditTodoLoading }] = useEditTodoMutation();

  const handleCloseForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & ModalTodoFormFields;

    if (editMode) {
      editingTodo(target);
    } else {
      addingTodo(target);
    }
  };

  const addingTodo = (target: EventTarget & ModalTodoFormFields) => {
    const postData = {
      title: target.title.value,
      description: target.description?.value,
      parentId: data.id,
    };

    addTodo(postData)
      .unwrap()
      .then(() => onClose())
      .catch((err) => alert(err.data.message[0]));
  };

  const editingTodo = (target: EventTarget & ModalTodoFormFields) => {
    const postData = {
      id: data.id,
      title: target.title.value,
      description: target.description?.value,
    };

    editTodo(postData)
      .unwrap()
      .then(() => onClose())
      .catch((err) => alert(err.data.message[0]));
  };

  let submitBtnContent;
  if (editMode) {
    submitBtnContent = (
      <>
        <AiOutlineEdit size={20} />
        Изменить
      </>
    );
  } else {
    submitBtnContent = (
      <>
        <AiOutlinePlus size={20} />
        Добавить
      </>
    );
  }

  return (
    <div className="overlay">
      <form className="modal-form" onSubmit={handleSubmit}>
        <button
          className="modal-close-btn"
          aria-label="close"
          onClick={handleCloseForm}
        >
          <AiOutlineClose size={36} />
        </button>
        <label className="field" htmlFor="title">
          <span className="field-label">Заголовок</span>
          <input
            className="field-input"
            id="title"
            name="title"
            defaultValue={editMode ? data?.title : ""}
          />
        </label>
        <label className="field" htmlFor="description">
          <span className="field-label">Описание</span>
          <textarea
            className="field-input"
            id="description"
            name="description"
            rows={4}
            defaultValue={editMode ? data?.description : ""}
          />
        </label>
        <div className="modal-container-btn">
          <button
            className="add-btn modal-submit-btn"
            type="submit"
            disabled={isAddTodoLoading || isEditTodoLoading}
          >
            {submitBtnContent}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalTodoForm;
