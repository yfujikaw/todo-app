import React from 'react';
import { Todo } from '../../types/todo';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={`${todo.title}を${todo.completed ? '未完了' : '完了'}にする`}
        />
        <div className="todo-text-container">
          <span className="todo-text">{todo.title}</span>
          <span className="todo-date">{formatDate(todo.createdAt)}</span>
        </div>
      </div>
      <div className="todo-actions">
        <button
          className="delete-button"
          onClick={handleDelete}
          aria-label={`${todo.title}を削除する`}
        >
          ×
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
