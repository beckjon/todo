import styles from "./TodoItem.module.css";

interface Props {
  id: string;
  value: string;
  completed: boolean;
  toggleTodoComplete: (id: string) => void;
}

export const TodoItem = ({
  id,
  value,
  completed,
  toggleTodoComplete,
}: Props) => {
  return (
    <li key={id} className={styles.item}>
      <label className={styles.label}>
        <input
          type="checkbox"
          id={id}
          className={`${styles.checkbox}`}
          checked={completed}
          onChange={() => toggleTodoComplete(id)}
        />
        {value}
      </label>
    </li>
  );
};
