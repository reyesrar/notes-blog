import { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [editingNote, setEditingNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = (note) => {
    if (editingNote) {
      setNotes(prevNotes =>
        prevNotes.map((n) =>
          n.id === editingNote.id ? { ...note, id: editingNote.id } : n
        )
      );
    } else {
      setNotes(prevNotes => [...prevNotes, { ...note, id: Date.now() }]);
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
      if (window.confirm(`¿Seguro que deseas eliminar la nota "${note.title}"?`)) {
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

  return (
    <div className="App app-flex">
      <div className="sidebar">
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
      </div>
      <div className="main-content">
        <NoteList
          notes={notes}
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