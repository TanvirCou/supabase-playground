/**
 * TodoItem Component
 * Displays a single todo task with edit and delete actions.
 */
import '../styles/home.css';

/** Format ISO date string to a human-readable format */
const formatDate = (isoString) => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
};

const TodoItem = ({ todo, isEditing, onEdit, onDelete }) => {
  return (
    <article className={`todo-item${isEditing ? ' editing' : ''}`} aria-label={`Task: ${todo.title}`}>
      {/* Left icon */}
      <div className="todo-item-icon" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      </div>

      {/* Body */}
      <div className="todo-item-body">
        <h3 className="todo-item-title">{todo.title}</h3>
        <p className="todo-item-description">{todo.description}</p>
        <div className="todo-item-meta">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <time dateTime={todo.created_at}>{formatDate(todo.created_at)}</time>
          {isEditing && <span className="text-primary" style={{ marginLeft: '0.25rem' }}>· editing</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="todo-item-actions">
        {/* Edit button */}
        <button
          id={`edit-btn-${todo.id}`}
          className="btn-icon"
          onClick={() => onEdit(todo)}
          title="Edit task"
          aria-label={`Edit task: ${todo.title}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        {/* Delete button */}
        <button
          id={`delete-btn-${todo.id}`}
          className="btn-icon delete"
          onClick={() => onDelete(todo.id)}
          title="Delete task"
          aria-label={`Delete task: ${todo.title}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default TodoItem;
