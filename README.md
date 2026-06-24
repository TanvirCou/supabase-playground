# 🚀 Supabase Playground

A comprehensive playground project built to master core **Supabase** features. This repository serves as a technical documentation of my learning journey, covering everything from Authentication to Realtime database updates and secure file storage.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Backend-as-a-Service**: Supabase
- **Styling**: Vanilla CSS (Custom UI Components)
- **Routing**: React Router DOM

---

## 📖 What I Learned

### 1. 🔐 Authentication & Session Management
Implemented a robust authentication flow and centralized session management using Supabase Auth.
- **Features**: User Registration, Login, and persistent Auth sessions.
- **Authentication Implementation**:
  ```javascript
  // Sign Up
  const { data, error } = await supabase.auth.signUp({ email, password });

  // Sign In
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  ```
- **Session Management**:
  Handled initial session checks and real-time auth state listeners to keep the user logged in across refreshes.
  ```javascript
  // 1. Get initial session on app load
  const { data: { session } } = await supabase.auth.getSession();

  // 2. Listen for auth state changes (SIGN_IN, SIGN_OUT, etc.)
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') setSession(session);
    else if (event === 'SIGNED_OUT') setSession(null);
  });
  ```

### 2. 📝 CRUD Operations
Mastered the foundational Create, Read, Update, and Delete operations with advanced filtering and server-side logic.

- **Read (Server-side Pagination & Search)**:
  ```javascript
  const { data, count } = await supabase
    .from("todos")
    .select("*", { count: 'exact' })
    .or(`title.ilike.%${query}%`) // Server-side search
    .order('created_at', { ascending: false })
    .range(from, to); // Pagination
  ```

- **Create**: Inserting new tasks with associated user IDs and image URLs.
  ```javascript
  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, description, image: imageUrl, user_id: userId }])
    .select()
    .single();
  ```

- **Update**: Patching existing records using unique identifiers.
  ```javascript
  const { data, error } = await supabase
    .from("todos")
    .update({ title, description, image: imageUrl })
    .eq("id", todoId)
    .select()
    .single();
  ```

- **Delete**: Removing records securely from the database.
  ```javascript
  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", todoId);
  ```

### 3. ⚡ Realtime Database
Leveraged Supabase's Realtime capabilities to keep the UI in sync without manual refreshing.
- **Implementation**:
  ```javascript
  const subscription = supabase.channel("onTasks")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "todos" }, 
      (payload) => {
        setTodos((prev) => [payload.new, ...prev]);
      })
    .subscribe();
  ```

### 4. 📁 Supabase Storage
Implemented file handling for task-related images.
- **Upload**: Storing images in a dedicated `todos-img` bucket.
- **Public URLs**: Generating accessible links for the frontend using `.getPublicUrl()`.
- **Implementation**:
  ```javascript
  const { data } = await supabase.storage.from('todos-img').upload(path, imageFile);
  const imageUrl = supabase.storage.from('todos-img').getPublicUrl(data.path).data.publicUrl;
  ```

### 5. 🛡️ Row Level Security (RLS)
Learned how to secure the database at the row level. 
- **Concept**: Ensuring users can only access and modify their own data.
- **Example Policy**:
  ```sql
  -- Enable users to see only their own todos
  CREATE POLICY "Users can view their own todos" 
  ON todos FOR SELECT 
  USING (auth.uid() = user_id);
  ```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (optional, for local development)
- Docker Desktop (required for local Supabase)

### Option 1: Supabase Cloud (Recommended for Quick Start)
1. **Create a project**: Go to [Supabase Dashboard](https://app.supabase.com/) and create a new project.
2. **Setup Database**: Run the SQL found in the features section to create the `todos` table and `todos-img` bucket.
3. **Environment Variables**: Create a `.env` file:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   ```

### Option 2: Local Supabase Development
1. **Initialize Supabase**:
   ```bash
   npx supabase init
   ```
2. **Start Supabase Services** (Requires Docker):
   ```bash
   npx supabase start
   ```
3. **Environment Variables**: Use the local URL and keys provided in the terminal:
   ```env
   VITE_SUPABASE_URL=http://127.0.0.1:54321
   VITE_SUPABASE_PUBLISHABLE_KEY=your_local_anon_key
   ```

### Installation & Run
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd supabase-playground
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```

---

## 🎯 Project Goals
The main goal of this project was to move beyond basic integration and understand the "how" and "why" behind Supabase's powerful features. Each component was carefully built to test specific edge cases like debounced search, image previews, and seamless realtime synchronization.
