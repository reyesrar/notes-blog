import React from 'react';

function getPreviewLength(columns) {
  if (columns === 1) return 510;
  if (columns === 2) return 290;
  if (columns === 3) return 80;
  if (columns === 4) return 30;
  return 60;
}

function getPreview(text, columns) {
  const limit = getPreviewLength(columns);
  if (text.length > limit) {
    return text.slice(0, limit) + '...';
  }
  return text;
}

function NoteItem({ note, onEdit, previewLength = 50, deleteMode, columns }) {
  return (
    <div
      className={`note-item note-item-cols-${columns}${deleteMode ? ' note-item-delete-mode' : ''}`}
      style={deleteMode ? {} : { background: note.color || '#fff' }}
      onClick={() => onEdit(note)}
      title={deleteMode ? 'Click to delete this note' : undefined}
    >
      <p className="note-item-title" style={{ color: '#181818' }}>{note.title}</p>
      <p className="note-item-content" style={{ color: '#181818' }}>
        {getPreview(note.content, columns)}
      </p>
    </div>
  );
}

export default NoteItem;