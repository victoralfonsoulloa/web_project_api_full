import { useState } from 'react';

export default function NewCard({ onAddCard, onClose }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleImageUrl = (event) => {
    setImageUrl(event.target.value);
  };

  const handleClick = () => {
    onAddCard({ title, imageUrl });
    setTitle(''); // Reset form
    setImageUrl(''); // Reset form
    onClose();
  };

  return (
    <>
      <label className="form__field">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="form__input form__input-name"
          id="title"
          required
          minLength="2"
          maxLength="40"
          value={title}
          onChange={handleTitle}
        />
        <span className="form__input-error title-error"></span>
      </label>
      <label className="form__field">
        <input
          type="url"
          placeholder="Image URL"
          name="image"
          className="form__input"
          id="imageUrl"
          pattern="https://.*"
          required
          value={imageUrl}
          onChange={handleImageUrl}
        />
        <span className="form__input-error imageUrl-error"></span>
      </label>
      <button
        type="button"
        className="form__button"
        id="form__button"
        onClick={handleClick}
      >
        Save
      </button>
    </>
  );
}
