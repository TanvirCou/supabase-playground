/**
 * TodoList Component
 * Renders the list of filtered todos, or an empty/no-results state.
 */
import '../styles/home.css';
import TodoItem from './TodoItem';

const TodoList = ({ todos, searchQuery, editTodoId, onEdit, onDelete }) => {
  /* Empty state — no todos exist at all */
  if (todos.length === 0 && !searchQuery) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" aria-hidden="true">📋</div>
        <h3>No tasks yet</h3>
        <p>Create your first task using the form above to get started.</p>
      </div>
    );
  }

  /* No search results */
  if (todos.length === 0 && searchQuery) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" aria-hidden="true">🔍</div>
        <h3>No results found</h3>
        <p>
          No tasks match &ldquo;<strong>{searchQuery}</strong>&rdquo;. Try a different
          keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list" role="list" aria-label="Task list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editTodoId === todo.id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
