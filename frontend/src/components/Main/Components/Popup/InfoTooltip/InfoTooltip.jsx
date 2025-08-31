import React from 'react';

export default function InfoTooltip({ image, title}) {
  return (
    <div className="info-tooltip">
      <img src={image} alt={title} className="info-tooltip__image" />
      <h2 className="info-tooltip__title">{title}</h2>
    </div>
  );
}
