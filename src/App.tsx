import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import { Todo } from './types/todo';
import { loadTodos, saveTodos, generateUUID } from './utils/storage';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 初期データの読み込み
  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []);

  // TODOの追加
  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: generateUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // TODOの完了状態切り替え
  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // TODOの削除
  const handleDeleteTodo = (id: string) => {
    if (window.confirm('このタスクを削除しますか？')) {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
    }
  };

  // 統計情報の計算
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="app">
      <Header totalTodos={totalTodos} completedTodos={completedTodos} />
      <main className="main-content">
        <div className="container">
          <TodoForm onAddTodo={handleAddTodo} />
          <TodoList
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </main>
    </div>
  );
}

export default App
