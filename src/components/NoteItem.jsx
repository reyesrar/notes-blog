import React from 'react';

function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="note-item">
      <p className="note-item-title">{note.title}</p>
      <p className="note-item-content">{note.content}</p>
      <div className="note-item-actions">
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteItem;