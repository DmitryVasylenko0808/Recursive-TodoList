import React from "react";
import { useAddTodoMutation } from "../../api/todosApi";

type AddFormFields = {
  title: { value: string };
};

const AddForm = () => {
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & AddFormFields;
    const data = {
      title: target.title.value,
    };

    addTodo(data)
      .unwrap()
      .catch((err) => alert(err.data.message[0]));
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input className="add-input" name="title" aria-label="title" />
      <button className="add-btn" type="submit" disabled={isLoading}>
        Добавить
      </button>
    </form>
  );
};

export default AddForm;
