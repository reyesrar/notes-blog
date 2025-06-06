import { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [error, setError] = useState('');

  const getUsers = () => JSON.parse(localStorage.getItem('notesblog_users') || '{}');
  const saveUsers = (users) => localStorage.setItem('notesblog_users', JSON.stringify(users));

  const hash = str => btoa(unescape(encodeURIComponent(str)));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const userId = 'user_' + hash(username.trim().toLowerCase());
    const users = getUsers();

    if (mode === 'register') {
      if (!username.trim() || !password) {
        setError('Username and password required');
        return;
      }
      if (users[userId]) {
        setError('User already exists');
        return;
      }
      users[userId] = { username, passwordHash: hash(password) };
      saveUsers(users);
      localStorage.setItem('notesblog_user', JSON.stringify({ username, userId }));
      onLogin({ username, userId });
    } else {
      // login
      if (!users[userId] || users[userId].passwordHash !== hash(password)) {
        setError('Invalid username or password');
        return;
      }
      localStorage.setItem('notesblog_user', JSON.stringify({ username: users[userId].username, userId }));
      onLogin({ username: users[userId].username, userId });
    }
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">{mode === 'login' ? 'Sign In' : 'Register'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="login-input"
        />
        {error && <div className="login-error">{error}</div>}
        <button type="submit" className="login-btn">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
        <div className="login-switch">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                className="login-link"
                onClick={() => { setMode('register'); setError(''); }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="login-link"
                onClick={() => { setMode('login'); setError(''); }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('notesblog_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [editingNote, setEditingNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const getInitialColumns = (user) => {
    if (!user) return 5;
    const key = `notesblog_columns_${user.userId}`;
    const stored = localStorage.getItem(key);
    return stored ? Number(stored) : 5;
  };
  const [columns, setColumns] = useState(() => getInitialColumns(user));

  useEffect(() => {
    setColumns(getInitialColumns(user));
  }, [user]);

  const userNotes = user ? notes.filter(n => n.userId === user.userId) : [];

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`notesblog_columns_${user.userId}`, columns);
    }
  }, [columns, user]);

  const addOrUpdateNote = (note) => {
    if (!user) return;
    if (editingNote) {
      setNotes(prevNotes =>
        prevNotes.map((n) =>
          n.id === editingNote.id ? { ...note, id: editingNote.id, userId: user.userId } : n
        )
      );
    } else {
      setNotes(prevNotes => [
        ...prevNotes,
        { ...note, id: Date.now(), userId: user.userId }
      ]);
    }
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const handleFormSubmit = (note) => {
    addOrUpdateNote(note);
    setShowModal(false);
  };

  const handleEditNote = (note) => {
    if (deleteMode) {
      if (window.confirm(`Are you sure you want to delete the note "${note.title}"?`)) {
        setNotes(prevNotes => prevNotes.filter((n) => n.id !== note.id));
      }
      setDeleteMode(false);
    } else {
      setEditingNote(note);
      setShowModal(true);
    }
  };

  const handleChangeColumns = () => {
    setColumns(prev => prev === 5 ? 1 : prev + 1);
  };

  const getPreviewLength = () => {
    if (columns === 1) return 400;
    if (columns === 2) return 180;
    if (columns === 3) return 80;
    if (columns === 4) return 40;
    return 22;
  };

  const handleLogout = () => {
    localStorage.removeItem('notesblog_user');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App app-flex">
      <div className="sidebar">
        <div style={{ fontWeight: 'bold', marginBottom: 20, fontSize: 15, textAlign: 'center' }}>
          {user.username}
        </div>
        <div
          className="sidebar-create-btn"
          onClick={handleCreateNote}
        >
          + New Note
        </div>
        <div
          className={`sidebar-delete-btn${deleteMode ? ' active' : ''}`}
          onClick={() => setDeleteMode(dm => !dm)}
        >
          {deleteMode ? 'Select Note' : 'Delete Note'}
        </div>
        <div
          className="sidebar-view-btn"
          onClick={handleChangeColumns}
        >
          View {columns}x{columns}
        </div>
        <div className="sidebar-logout-btn">
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="main-content">
        <NoteList
          notes={userNotes}
          onEdit={handleEditNote}
          onDelete={() => {}}
          previewLength={getPreviewLength()}
          deleteMode={deleteMode}
          columns={columns}
        />
      </div>
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <NoteForm onSubmit={handleFormSubmit} initialNote={editingNote} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;