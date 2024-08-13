import React, { useEffect, useRef, useState } from "react";

import styles from "./Input.module.css";

interface Props {
  onEnter: (value: string) => void;
}

export const Input = ({ onEnter }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const trimmedValue = inputValue.trim();
      if (trimmedValue !== "") {
        onEnter(trimmedValue);
        setInputValue("");
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.arrow} />
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        name="input"
        className={styles.input}
        placeholder="Добавьте новые задачи"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
