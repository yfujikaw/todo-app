import React from 'react';
import Header from './components/Header/Header';
import './App.css';

function App() {
  // 仮のデータ（後で実際のTODOデータに置き換える）
  const totalTodos = 0;
  const completedTodos = 0;

  return (
    <div className="app">
      <Header totalTodos={totalTodos} completedTodos={completedTodos} />
      <main className="main-content">
        <div className="container">
          <p>TODOアプリケーションのメインコンテンツがここに表示されます</p>
        </div>
      </main>
    </div>
  );
}

export default App
