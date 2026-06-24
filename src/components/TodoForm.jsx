/**
 * TodoForm Component
 * Handles both creating and editing todos.
 * - editTodo: if set, form operates in edit mode
 * - onSubmit: callback(title, description, editTodo)
 * - onCancel: callback to exit edit mode
 */
import { useEffect, useRef, useState } from 'react';
import '../styles/home.css';

const TodoForm = ({ editTodo, onSubmit, onCancel }) => {
  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage]           = useState(null);   // File object or null
  const [preview, setPreview]       = useState('');     // for edit mode existing URL
  const [errors, setErrors]         = useState({});
  const fileInputRef                 = useRef(null);

  /* Populate form when entering edit mode */
  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
      setImage(null);
      setPreview(editTodo.image || '');
      setErrors({});
    } else {
      setTitle('');
      setDescription('');
      setImage(null);
      setPreview('');
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
    
    onSubmit(title.trim(), description.trim(), image, editTodo);
    setTitle('');
    setDescription('');
    setImage(null);
    setPreview('');
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
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

          {/* Image field */}
          <div className="form-group">
            <label className="image-label-text">Image</label>
            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              id="todo-image"
              type="file"
              accept="image/*"
              className="file-input-hidden"
              onChange={(e) => {
                const file = e.target.files[0] || null;
                setImage(file);
                setPreview(file ? URL.createObjectURL(file) : '');
                if (errors.image) setErrors((prev) => ({ ...prev, image: '' }));
              }}
            />
            {/* Custom styled button */}
            <label htmlFor="todo-image" className="file-input-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              {image ? image.name : 'Choose Image'}
            </label>
            {/* Preview */}
            {preview && (
              <div className="image-preview-wrapper">
                <img src={preview} alt="preview" className="image-preview" />
                <button
                  type="button"
                  className="image-preview-remove"
                  onClick={() => {
                    setImage(null);
                    setPreview('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            )}
            {errors.image && (
              <span className="form-error" role="alert">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                {errors.image}
              </span>
            )}
          </div>
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
