import React, { useContext } from "react";
import "../index.css";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwner = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const likeButtonClassName = `card__like-icon ${
    isLiked ? "card__like-icon_active" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card__item">
      <button
        className={`card__trash ${isOwner ? "card__trash_active" : ""}`}
        type="button"
        onClick={handleDeleteClick}></button>
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__name">
        <h2 className="card__title overflow">{card.name}</h2>
        <div>
          <button
            type="button"
            className={likeButtonClassName}
            onClick={handleLikeClick}></button>
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
