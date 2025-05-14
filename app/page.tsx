'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <main className={`min-h-screen p-8 m-0 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <button 
        onClick={toggleTheme} 
        className={`absolute top-4 right-4 px-4 py-2 rounded transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
            : 'bg-gray-700 text-white hover:bg-gray-600'
        }`}
      >
        {theme === 'light' ? 'dark theme' : 'light theme'}
      </button>

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            className={`flex-1 p-2 rounded border transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Добавить задачу"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Добавить
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className={`flex items-center gap-2 p-2 rounded border transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-300'
            }`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5"
              />
              
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className={`flex-1 p-1 rounded border transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  onBlur={saveEdit}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                />
              ) : (
                <span className={`flex-1 ${todo.completed ? 'line-through opacity-70' : ''}`}>
                  {todo.text}
                </span>
              )}
              
              <button
                onClick={() => startEdit(todo)}
                className="px-2 py-1 text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                ✎
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-2 py-1 text-red-500 hover:text-red-600 transition-colors duration-300"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
