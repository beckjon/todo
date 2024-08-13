import { v4 as uuidv4 } from "uuid";

import { TodoItem } from "../TodoItem/TodoItem";
import { Todo } from "../../App";

import styles from "./TodoList.module.css";

interface Props {
  todos: Todo[];
  currentFilter: string;
  toggleTodoComplete: (id: string) => void;
}

export const TodoList = ({
  todos,
  currentFilter,
  toggleTodoComplete,
}: Props) => {
  const filterTodos = (todos: Todo[], filter: string): Todo[] => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos;
    }
  };

  const filteredTodos = filterTodos(todos, currentFilter);

  return (
    <div className={styles.wrapper}>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={uuidv4()}
            toggleTodoComplete={toggleTodoComplete}
            {...todo}
          />
        ))}
      </ul>
    </div>
  );
};
