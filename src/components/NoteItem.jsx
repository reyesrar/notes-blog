import React from 'react';

function NoteItem({ note, onEdit, onDelete, previewLength = 22 }) {
  const getPreview = (text) => {
    if (text.length > previewLength) {
      return text.slice(0, previewLength) + '...';
    }
    return text;
  };

  return (
    <div className="note-item">
      <p className="note-item-title">{note.title}</p>
      <p className="note-item-content">{getPreview(note.content)}</p>
      <div className="note-item-actions">
        <button onClick={() => onEdit(note)}>View</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteItem;