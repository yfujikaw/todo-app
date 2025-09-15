import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  const handleAddTodo = useCallback((title: string) => {
    const newTodo: Todo = {
      id: generateUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    setTodos(prevTodos => {
      const updatedTodos = [newTodo, ...prevTodos];
      saveTodos(updatedTodos);
      return updatedTodos;
    });
  }, []);

  // TODOの完了状態切り替え
  const handleToggleTodo = useCallback((id: string) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos(updatedTodos);
      return updatedTodos;
    });
  }, []);

  // TODOの削除
  const handleDeleteTodo = useCallback((id: string) => {
    if (window.confirm('このタスクを削除しますか？')) {
      setTodos(prevTodos => {
        const updatedTodos = prevTodos.filter(todo => todo.id !== id);
        saveTodos(updatedTodos);
        return updatedTodos;
      });
    }
  }, []);

  // 統計情報の計算
  const { totalTodos, completedTodos } = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    return { totalTodos: total, completedTodos: completed };
  }, [todos]);

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
