import { Todo } from '../types/todo';

const STORAGE_KEY = 'todos';

/**
 * ローカルストレージからTODOリストを読み込む
 * @returns TODOリスト
 */
export const loadTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    
    const parsed = JSON.parse(stored);
    
    // データの検証
    if (!Array.isArray(parsed)) {
      console.warn('Invalid data format in localStorage, initializing with empty array');
      return [];
    }
    
    // 各TODOアイテムの検証と変換
    return parsed.map((item: any) => ({
      id: String(item.id || ''),
      title: String(item.title || ''),
      completed: Boolean(item.completed),
      createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
    })).filter((item: Todo) => item.id && item.title);
    
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error);
    return [];
  }
};

/**
 * TODOリストをローカルストレージに保存する
 * @param todos TODOリスト
 */
export const saveTodos = (todos: Todo[]): void => {
  try {
    const serialized = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error);
    throw new Error('データの保存に失敗しました');
  }
};

/**
 * UUID v4を生成する
 * @returns 生成されたUUID
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
