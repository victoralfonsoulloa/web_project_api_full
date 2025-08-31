import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext';

export default function EditAvatar({ onClose }) {
  const [avatar, setAvatar] = useState('');

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const handleClick = (event) => {
    handleUpdateAvatar({ avatar });
    onClose();
  };

  return (
    <>
      <label className="form__field">
        <input
          type="url"
          placeholder="Image URL"
          name="image"
          className="form__input"
          id="avatar"
          pattern="https://.*"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
        <span className="form__input-error avatar-error"></span>
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
