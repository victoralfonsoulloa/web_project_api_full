import React from 'react';

export default function RemoveCard({ onConfirm }) {
  return (
    <>
      <button type="button" className="form__button" id="form__button" onClick={onConfirm}>
        Delete
      </button>
    </>
  );
}
