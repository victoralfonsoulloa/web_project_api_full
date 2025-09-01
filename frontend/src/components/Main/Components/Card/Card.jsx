import { useContext } from 'react';
import deleteButton from '../../../../images/delete-button.png';
import likeButton from '../../../../images/like-button.png';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';

export default function Card(props) {
  const { name, link, isLiked, owner } = props.card;
  const { onImageClick, onDeleteClick, onCardLike } = props;
  const { currentUser } = useContext(CurrentUserContext);

  // Check if current user is the owner of this card
  const isOwner =
    currentUser &&
    owner &&
    (currentUser._id === owner._id || currentUser._id === owner);

  // Verifies if user had liked the card
  const cardLikeButtonClassName = `card__caption-like_icon${
    isLiked ? ' card__caption-like_icon--active' : ''
  }`;

  function handleLikeClick() {
    onCardLike(props.card);
  }

  return (
    <li className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={() => onImageClick(link, name)}
      />
      {/* Only show delete button if current user owns this card */}
      {isOwner && (
        <button className="card__delete-image" onClick={onDeleteClick}>
          <img
            src={deleteButton}
            alt="Delete button icon"
            className="card__delete-image-icon"
          />
        </button>
      )}
      <div className="card__caption">
        <p className="card__caption_title">{name}</p>

        <button
          className={cardLikeButtonClassName}
          aria-label="Like button"
          onClick={handleLikeClick}
          type="button"
        ></button>
      </div>
    </li>
  );
}
