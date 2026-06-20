import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import '../styles/home.css';
import { supabase } from '../utils/supabase';

const PAGE_SIZE = 3;

const Home = ({onSetSession, userId}) => {
  const navigate = useNavigate();

  /* ── State ── */
  const [todos, setTodos]         = useState([]);
  const [editTodo, setEditTodo]   = useState(null); // todo being edited
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading]     = useState(false);
  const [page, setPage]           = useState(0);
  const [hasMore, setHasMore]     = useState(true);

  /**
   * Fetch Todos — Handles both standard load and search
   * @param {number} currentPage - The page to fetch
   * @param {string} query - Optional search string
   */
  const fetchTodos = async (currentPage = 0, query = '') => {
    setLoading(true);
    const from = currentPage * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let supabaseQuery = supabase
      .from("todos")
      .select("*", { count: 'exact' });

    // Server-side filtering
    if (query.trim()) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%`);
    }

    const { data, error, count } = await supabaseQuery
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      if (currentPage === 0) {
        setTodos(data || []);
      } else {
        setTodos((prev) => [...prev, ...data]);
      }
      
      // Update hasMore based on total count returned by Supabase
      setHasMore(count > (currentPage + 1) * PAGE_SIZE);
    }
    setLoading(false);
  };

  /* ── Effect: Debounced Search ── */
  useEffect(() => {
    // Page 0 fetch (initial or search refresh)
    const timer = setTimeout(() => {
      setPage(0);
      fetchTodos(0, searchQuery);
    }, searchQuery ? 500 : 0); // Delay for search, instant for initial/clear

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]); // fetchTodos is omitted to avoid infinite reload loop without useCallback

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTodos(nextPage, searchQuery);
  };

  /* ── CREATE / UPDATE ── */
  const handleSubmit = async (title, description, image, todoToEdit) => {
    if (todoToEdit) {
      const updatedTask = { title, description, image };

      const { data: updatedTodo, error } = await supabase
        .from("todos")
        .update(updatedTask)
        .eq("id", todoToEdit.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating todo:', error);
      } else {
        setTodos((prev) =>
          prev.map((t) => (t.id === todoToEdit.id ? updatedTodo : t))
        );
      }
      setEditTodo(null);
    } else {
      const newTodo = { title, description, image, user_id: userId };

      const { data: createdTodo, error } = await supabase
        .from("todos")
        .insert(newTodo)
        .select()
        .single();

      if (error) {
        console.error('Error creating todo:', error);
      } else {
        // If not searching, we can prepend. If searching, it might disappear if it doesn't match
        // and we usually want to refresh to see the true state.
        if (!searchQuery) {
          setTodos((prev) => [createdTodo, ...prev]);
        } else {
          // Re-fetch to ensure current search context is maintained
          fetchTodos(0, searchQuery);
        }
      }
    }
  };

  /* ── DELETE ── */
  const handleDelete = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error('Error deleting todo:', error);
    } else {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
    if (editTodo?.id === id) setEditTodo(null);
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => setEditTodo(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      // onSetSession(null);
      navigate('/login');
    }
  };

  

  return (
    <div className="home-page">
      <Header onLogout={handleLogout} />

      <main className="home-main">
        <div className="stats-bar">
          <div className="stat-chip">
            <span className="stat-dot" />
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'} {searchQuery ? 'matched' : 'loaded'}
          </div>
          {searchQuery && (
            <div className="stat-chip">
              🔍 Searching for &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>

        <TodoForm
          editTodo={editTodo}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <section className="todo-list-section">
          <div className="todo-list-header">
            <h2 className="todo-list-heading">
              {searchQuery ? 'Search Results' : 'Tasks'}
            </h2>
            <span className="todo-count-badge">{todos.length}</span>
          </div>

          <TodoList
            todos={todos}
            searchQuery={searchQuery}
            editTodoId={editTodo?.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {hasMore && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <button 
                onClick={handleLoadMore} 
                className="btn-secondary"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;


