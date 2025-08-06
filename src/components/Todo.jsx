const Todo = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow">
      <div
        className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 ml-4"
        title="Eliminar"
      >
        ✕
      </button>
    </div>
  )
}

export default Todo
