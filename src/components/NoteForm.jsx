import { useState, useEffect } from "react";

const COLOR_OPTIONS = [
  { value: "#fff", className: "color-white" },
  { value: "#ffb3b3", className: "color-red" },
  { value: "#fff9b3", className: "color-yellow" },
  { value: "#b3ffcc", className: "color-green" },
  { value: "#b3d8ff", className: "color-blue" },
  { value: "#e0b3ff", className: "color-purple" },
];

function NoteForm({ onSubmit, initialNote }) {
  const [title, setTitle] = useState(initialNote ? initialNote.title : '');
  const [content, setContent] = useState(initialNote ? initialNote.content : '');
  const [color, setColor] = useState(initialNote ? initialNote.color || '#fff' : '#fff');

  useEffect(() => {
    setTitle(initialNote ? initialNote.title : '');
    setContent(initialNote ? initialNote.content : '');
    setColor(initialNote ? initialNote.color || '#fff' : '#fff');
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, color });
    setTitle('');
    setContent('');
    setColor('#fff');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="noteform-color-row">
        <span style={{ marginRight: 8 }}>Color:</span>
        <div className="noteform-color-options">
          {COLOR_OPTIONS.map(opt => (
            <button
              type="button"
              key={opt.value}
              className={`noteform-color-swatch ${opt.className}${color === opt.value ? ' selected' : ''}`}
              aria-label={opt.className.replace('color-', '')}
              tabIndex={0}
              onClick={() => setColor(opt.value)}
            />
          ))}
        </div>
      </div>
      <button type="submit">Save Note</button>
    </form>
  );
}

export default NoteForm;