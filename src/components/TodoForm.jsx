/**
 * TodoForm Component
 * Handles both creating and editing todos.
 * - editTodo: if set, form operates in edit mode
 * - onSubmit: callback(title, description, editTodo)
 * - onCancel: callback to exit edit mode
 */
import { useEffect, useState } from 'react';
import '../styles/home.css';

const TodoForm = ({ editTodo, onSubmit, onCancel }) => {
  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors]         = useState({});

  /* Populate form when entering edit mode */
  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
      setErrors({});
    } else {
      setTitle('');
      setDescription('');
      setErrors({});
    }
  }, [editTodo]);

  /* Validate inputs */
  const validate = () => {
    const newErrors = {};
    if (!title.trim())       newErrors.title       = 'Title is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    return newErrors;
  };

  /* Handle form submission */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(title.trim(), description.trim(), editTodo);
    setTitle('');
    setDescription('');
    setErrors({});
  };

  const isEditing = Boolean(editTodo);

  return (
    <div className="todo-form-card">
      <h2 className="todo-form-title">
        {isEditing ? (
          <>
            <svg
              width="17"
              height="17"
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
            Edit Task
            <span className="badge">editing</span>
          </>
        ) : (
          <>
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Task
          </>
        )}
      </h2>

      <form className="todo-form" onSubmit={handleSubmit} noValidate>
        {/* Title field */}
        <div className="form-group">
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            placeholder="e.g. Set up Supabase project"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
            }}
          />
          {errors.title && (
            <span className="form-error" role="alert">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errors.title}
            </span>
          )}
        </div>

        {/* Description field */}
        <div className="form-group">
          <label htmlFor="todo-description">Description</label>
          <textarea
            id="todo-description"
            rows={3}
            placeholder="Describe what needs to be done…"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
            }}
          />
          {errors.description && (
            <span className="form-error" role="alert">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {errors.description}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="todo-form-actions">
          <button id="todo-submit-btn" type="submit" className="btn-primary">
            {isEditing ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Save Changes
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Task
              </>
            )}
          </button>

          {isEditing && (
            <button
              id="todo-cancel-btn"
              type="button"
              className="btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
