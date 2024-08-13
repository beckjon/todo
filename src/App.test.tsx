import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";
import { TodoItem } from "./components/TodoItem/TodoItem";

test("При добавлениее элемента, он появляется в списке", () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText("Добавьте новые задачи");
  fireEvent.change(inputElement, { target: { value: "Купить кофе" } });
  fireEvent.keyDown(inputElement, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
  });

  const taskElement = screen.getByText("Купить кофе");

  expect(taskElement).toBeInTheDocument();
});

test("Должна изменяться задача, при нажатии на checkbox задачи", () => {
  const toggleTodoCompleteMock = jest.fn();
  render(
    <TodoItem
      id="1"
      value="Сходить в магазин"
      completed={false}
      toggleTodoComplete={toggleTodoCompleteMock}
    />
  );

  const checkboxElement = screen.getByRole("checkbox");

  fireEvent.click(checkboxElement);

  expect(toggleTodoCompleteMock).toHaveBeenCalledWith("1");
});

describe("Фильтры", () => {
  test('Если выбрать фильтр "Active", только активные задачи должны отображаться', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("Добавьте новые задачи");

    fireEvent.change(inputElement, { target: { value: "Пойти погулять" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    fireEvent.change(inputElement, { target: { value: "Купить хлеб" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    fireEvent.click(screen.getByText("Пойти погулять"));

    fireEvent.click(screen.getByText("Active"));
    const activeTask = screen.getByText("Купить хлеб");
    const completedTask = screen.queryByText("Пойти погулять");

    expect(activeTask).toBeInTheDocument();
    expect(completedTask).toBeNull();
  });

  test('Если выбрать фильтр "Completed", только завершенные задачи должны отображаться', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("Добавьте новые задачи");

    fireEvent.change(inputElement, {
      target: { value: "Приготовить завтрак" },
    });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    fireEvent.change(inputElement, { target: { value: "Выпить стакан воды" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    fireEvent.click(screen.getByText("Приготовить завтрак"));

    fireEvent.click(screen.getByText("Completed"));
    const activeTask = screen.queryByText("Выпить стакан воды");
    const completedTask = screen.getByText("Приготовить завтрак");

    expect(activeTask).toBeNull();
    expect(completedTask).toBeInTheDocument();
  });

  test('Если выбрать фильтр "All", должны отображаться все задачи', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("Добавьте новые задачи");

    fireEvent.change(inputElement, {
      target: { value: "Посмотреть курс по TS" },
    });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    fireEvent.change(inputElement, { target: { value: "Найти работу" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    fireEvent.click(screen.getByText("Посмотреть курс по TS"));

    fireEvent.click(screen.getByText("All"));
    const activeTask = screen.queryByText("Найти работу");
    const completedTask = screen.getByText("Посмотреть курс по TS");

    expect(activeTask).toBeInTheDocument();
    expect(completedTask).toBeInTheDocument();
  });
});

test('Если нажать на "Clear completed", то все завершенные задачи должны удалиться из списка', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("Добавьте новые задачи");

  fireEvent.change(inputElement, { target: { value: "Выбросить мусор" } });
  fireEvent.keyDown(inputElement, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
  });

  fireEvent.change(inputElement, { target: { value: "Заварить чай" } });
  fireEvent.keyDown(inputElement, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
  });

  fireEvent.click(screen.getByText("Выбросить мусор"));

  fireEvent.click(screen.getByText("Clear completed"));
  const activeTask = screen.getByText("Заварить чай");
  const completedTask = screen.queryByText("Выбросить мусор");

  expect(activeTask).toBeInTheDocument();
  expect(completedTask).toBeNull();
});
