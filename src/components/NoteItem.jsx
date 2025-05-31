import React from 'react';

function NoteItem({ note, onEdit, previewLength = 50, deleteMode }) {
  const getPreview = (text) => {
    if (text.length > previewLength) {
      return text.slice(0, previewLength) + '...';
    }
    return text;
  };

  return (
    <div
      className={`note-item${deleteMode ? ' note-item-delete-mode' : ''}`}
      onClick={() => onEdit(note)}
      title={deleteMode ? 'Haz clic para eliminar esta nota' : undefined}
    >
      <p className="note-item-title">{note.title}</p>
      <p className="note-item-content">{getPreview(note.content)}</p>
    </div>
  );
}

export default NoteItem;