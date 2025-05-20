import { useState, useEffect } from "react";

function NoteForm({ onSubmit, initialNote }) {
  const [title, setTitle] = useState(initialNote ? initialNote.title : '');
  const [content, setContent] = useState(initialNote ? initialNote.content : '');

  useEffect(() => {
    setTitle(initialNote ? initialNote.title : '');
    setContent(initialNote ? initialNote.content : '');
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
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
      <button type="submit">Save Note</button>
    </form>
  );
}

export default NoteForm;