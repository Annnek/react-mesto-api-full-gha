import React from "react";
import "../index.css";
// import defaultAvatar from "../images/avatarProfile.jpg";
// import api from "../utils/Api.js";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  //onEditProfile, onAddPlace, onEditAvatar - вызов соответствующих функций из переданных пропсов
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button
            className="profile__button-edit-avatar"
            type="button"
            onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар пользователя"
            />
          </button>
          <div className="profile__title-block">
            <h1 className="profile__title overflow">{currentUser.name}</h1>
            <button
              className="profile__button-edit"
              type="button"
              onClick={onEditProfile}></button>
            <h2 className="profile__subtitle overflow">{currentUser.about}</h2>
          </div>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="card">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
