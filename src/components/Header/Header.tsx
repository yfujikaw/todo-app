import React from 'react';
import './Header.css';

interface HeaderProps {
  totalTodos: number;
  completedTodos: number;
}

const Header: React.FC<HeaderProps> = ({ totalTodos, completedTodos }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">📝 TODO App</h1>
        <p className="header-subtitle">タスクを管理して、効率的に作業を進めましょう</p>
        <div className="header-stats">
          <span className="stats-text">
            {totalTodos}件中{completedTodos}件完了
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
