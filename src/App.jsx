import { useState, useEffect } from 'react'
import Todo from './components/Todo'

const App = () => {
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (task.trim() === '') return
    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    }
    setTodos([newTodo, ...todos])
    setTask('')
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-grow px-4 py-2 border rounded"
            placeholder="Nueva tarea..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center">No hay tareas pendientes.</p>
          ) : (
            todos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
