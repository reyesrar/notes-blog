import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onEdit, onDelete, previewLength, deleteMode }) {
  return (
    <div className="notes-grid-container">
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <NoteItem 
              key={note.id} 
              note={note} 
              onEdit={onEdit} 
              onDelete={onDelete}
              previewLength={previewLength}
              deleteMode={deleteMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteList;