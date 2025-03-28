import { useEffect, useState } from "react";
import { TodoContextProvider } from "./Contexts";
import { TodoForm, TodoItem } from "./Components/index.js";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevs) => [
      {
        id: Date.now(),
        ...todo,
      },
      ...prevs,
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prevs) =>
      prevs.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevs) => prevs.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevs) => {
      return prevs.map((prevTodo) => {
        if (prevTodo.id === id) {
          return {
            ...prevTodo,
            completed: !prevTodo.completed,
          };
        }
        return prevTodo;
      });
    });
  };

  useEffect(() => {
    const todosTemp = JSON.parse(localStorage.getItem("todos"));
    if (todosTemp && todosTemp.length > 0) {
      setTodos(todosTemp);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
