import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        notes.map(note => (
          <NoteItem 
            key={note.id} 
            note={note} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))
      )}
    </div>
  );
}

export default NoteList;