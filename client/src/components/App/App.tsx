import React from "react";
import { AddForm } from "../AddForm";
import { TodoList } from "../TodoList";
import { useGetTodosQuery } from "../../api/todosApi";

import "./App.css";
import { Loading } from "../Loading";

const App = () => {
  const { data, isLoading } = useGetTodosQuery();

  return (
    <div className="container">
      <AddForm />
      {isLoading ? <Loading /> : <TodoList data={data || []} />}
    </div>
  );
};

export default App;
