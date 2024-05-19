import { useState, useEffect } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todoText) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todoText }]);
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, todoText) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? todoText : todo)));
  };
  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    // it is done to convert string into JSON as localStorage stores data into string

    if (todos && todos.length > 0) setTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    // converts todos to string to store in localStorage
  }, [todos]);
  return (
    <TodoProvider value={{ addTodo, deleteTodo, updateTodo, toggleTodo, todos }}>
      <div className="bg-slate-400 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white bg-purple-700">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */} <TodoForm />
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
    </TodoProvider>
  );
}

export default App;
