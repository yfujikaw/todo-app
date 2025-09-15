import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import TodoForm from './components/TodoForm/TodoForm';
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

  // 統計情報の計算
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="app">
      <Header totalTodos={totalTodos} completedTodos={completedTodos} />
      <main className="main-content">
        <div className="container">
          <TodoForm onAddTodo={handleAddTodo} />
          <div className="todo-content">
            <p>TODOリストがここに表示されます（次のIssueで実装予定）</p>
            <p>現在のTODO数: {totalTodos}件</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
