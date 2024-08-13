import { Button } from "../../ui/Button/Button";

import styles from "./TodoSummary.module.css";

interface Props {
  todosCompletedCount: number;
  currentFilter: string;
  clearCompleted: () => void;
  showActiveTodos: () => void;
  showCompletedTodos: () => void;
  showAllTodos: () => void;
}

export const TodoSummary = ({
  todosCompletedCount,
  currentFilter,
  clearCompleted,
  showActiveTodos,
  showCompletedTodos,
  showAllTodos,
}: Props) => {
  const buttonConfigs = [
    { text: "All", handler: showAllTodos, isActive: currentFilter === "all" },
    {
      text: "Active",
      handler: showActiveTodos,
      isActive: currentFilter === "active",
    },
    {
      text: "Completed",
      handler: showCompletedTodos,
      isActive: currentFilter === "completed",
    },
  ];

  return (
    <div className={styles.container}>
      <span className={styles.count}>{todosCompletedCount} items left</span>

      <div className={styles.btns}>
        {buttonConfigs.map(({ text, handler, isActive }) => (
          <Button key={text} handle={handler} isActive={isActive}>
            {text}
          </Button>
        ))}
      </div>

      <Button handle={clearCompleted}>Clear completed</Button>
    </div>
  );
};
