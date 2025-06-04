import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onEdit, onDelete, previewLength, deleteMode, columns }) {
  return (
    <div className={`notes-grid-container${columns === 1 ? ' notes-grid-container-horizontal' : ''}`}>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div className={`notes-grid notes-grid-${columns}`}>
          {notes.map(note => (
            <NoteItem 
              key={note.id} 
              note={note} 
              onEdit={onEdit} 
              onDelete={onDelete}
              previewLength={previewLength}
              deleteMode={deleteMode}
              columns={columns}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteList;