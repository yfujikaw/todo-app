import React, { useState, memo } from 'react';
import './TodoForm.css';

interface TodoFormProps {
  onAddTodo: (title: string) => void;
}

const MAX_LENGTH = 200;
const WARNING_LENGTH = 180;

const TodoForm: React.FC<TodoFormProps> = memo(({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || isSubmitting || trimmedValue.length > MAX_LENGTH) {
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
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setInputValue(value);
    }
  };

  const isInputValid = inputValue.trim().length > 0 && inputValue.trim().length <= MAX_LENGTH;
  const isNearLimit = inputValue.length >= WARNING_LENGTH;
  const isOverLimit = inputValue.length > MAX_LENGTH;

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
            className={`todo-input ${isOverLimit ? 'error' : isNearLimit ? 'warning' : ''}`}
            maxLength={MAX_LENGTH}
            disabled={isSubmitting}
            autoFocus
          />
          <button
            type="submit"
            className="add-button"
            disabled={!isInputValid || isSubmitting}
          >
            {isSubmitting ? '追加中...' : '追加'}
          </button>
        </div>
        <div className="input-feedback">
          <div className={`character-count ${isOverLimit ? 'error' : isNearLimit ? 'warning' : ''}`}>
            {inputValue.length}/{MAX_LENGTH}
          </div>
          {isOverLimit && (
            <div className="error-message">
              文字数が上限を超えています
            </div>
          )}
          {isNearLimit && !isOverLimit && (
            <div className="warning-message">
              文字数が上限に近づいています
            </div>
          )}
        </div>
      </form>
    </div>
  );
});

TodoForm.displayName = 'TodoForm';

export default TodoForm;
