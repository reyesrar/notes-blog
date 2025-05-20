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

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (editingNote && notes.some(n => n.id === editingNote.id)) {
      setEditingNote(null);
    }
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

  const editNote = (note) => {
    setEditingNote(note);
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <h1>Notes Blog</h1>
      <NoteForm onSubmit={addOrUpdateNote} initialNote={editingNote} />
      <NoteList notes={notes} onEdit={editNote} onDelete={deleteNote} />
    </div>
  );
}

export default App;