import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onEdit, previewLength, deleteMode, columns, onColorChange }) {
  return (
    <div className={`notes-grid-container${columns === 1 ? ' notes-grid-container-horizontal' : ''}`}>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div className={`notes-grid notes-grid-${columns}${deleteMode ? ' delete-mode' : ''}`}>
          {notes.map(note => (
            <NoteItem 
              key={note.id} 
              note={note} 
              onEdit={onEdit} 
              previewLength={previewLength}
              deleteMode={deleteMode}
              columns={columns}
              onColorChange={onColorChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteList;