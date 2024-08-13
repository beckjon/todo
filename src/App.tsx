import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Input } from "./ui/Input/Input";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoSummary } from "./components/TodoSummary/TodoSummary";

import "./App.css";

export interface Todo {
  id: string;
  value: string;
  completed: boolean;
}

function App() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return localStorage.getItem("todos")
      ? JSON.parse(storedTodos ? storedTodos : "[]")
      : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Не получилось сохранить данные в localStorage:", error);
    }
  }, [todos]);

  const addTodo = (value: string) => {
    setTodos((prevTodos) => [
      {
        id: uuidv4(),
        value,
        completed: false,
      },
      ...prevTodos,
    ]);
  };

  const toggleTodoComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const showActiveTodos = () => {
    setCurrentFilter("active");
  };

  const showCompletedTodos = () => {
    setCurrentFilter("completed");
  };

  const showAllTodos = () => {
    setCurrentFilter("all");
  };

  return (
    <main className="main">
      <h1 className="title">todos</h1>
      <div className="container">
        <Input onEnter={addTodo} />
        <TodoList
          todos={todos}
          currentFilter={currentFilter}
          toggleTodoComplete={toggleTodoComplete}
        />
        {todos.length > 0 && (
          <TodoSummary
            todosCompletedCount={todos.filter((todo) => !todo.completed).length}
            currentFilter={currentFilter}
            clearCompleted={clearCompleted}
            showActiveTodos={showActiveTodos}
            showCompletedTodos={showCompletedTodos}
            showAllTodos={showAllTodos}
          />
        )}
      </div>
    </main>
  );
}

export default App;
