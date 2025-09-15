import React, { useState } from 'react';
import './TodoForm.css';

interface TodoFormProps {
  onAddTodo: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      onAddTodo(trimmedValue);
      setInputValue('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="todo-form-container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="新しいタスクを入力してください..."
            className="todo-input"
            maxLength={100}
            disabled={isSubmitting}
            autoFocus
          />
          <button
            type="submit"
            className="add-button"
            disabled={!inputValue.trim() || isSubmitting}
          >
            {isSubmitting ? '追加中...' : '追加'}
          </button>
        </div>
        <div className="input-info">
          <span className="char-count">{inputValue.length}/100</span>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
