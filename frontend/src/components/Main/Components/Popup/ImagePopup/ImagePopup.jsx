import React from 'react';

export default function ImagePopup({ imageUrl, caption, onClose }) {
  return (
    <div className="popup popup_type_image">
      <div className="popup__container-image">
        <img src={imageUrl} alt={caption} className="popup-picture" />
        <p className="popup-caption">{caption}</p>
        <button type="button" className="popup__button-close" onClick={onClose}>
          <img
            src="../../../../images/close-button.png"
            alt="Close button"
            className="popup__button-icon"
          />
        </button>
      </div>
    </div>
  );
}

