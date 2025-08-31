import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext';

export default function EditProfile({ onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name || '');
  const [description, setDescription] = useState(currentUser.about || '');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClick = (event) => {
    handleUpdateUser({ name, about: description });
    onClose();
  };

  return (
    <>
      <label htmlFor="form__field">
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="form__input"
          id="name"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="form__input-error name-error"></span>
      </label>
      <label htmlFor="form__field">
        <input
          type="text"
          placeholder="About me"
          name="aboutMe"
          className="form__input form__input-aboutMe"
          id="aboutMe"
          required
          minLength="2"
          maxLength="65"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="form__input-error aboutMe-error"></span>
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
