import deleteButton from '../../../../images/delete-button.png';
import likeButton from '../../../../images/like-button.png';

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { onImageClick, onDeleteClick, onCardLike } = props;


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
      <button className="card__delete-image" onClick={onDeleteClick}>
        <img
          src={deleteButton}
          alt="Delete button icon"
          className="card__delete-image-icon"
        />
      </button>
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
