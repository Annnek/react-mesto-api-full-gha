import React from "react";
import "../index.css";

function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    //условие, чтобы задать класс "popup_opened" при открытом попапе, иначе класс не добавляется. мы используем тернарный оператор, чтобы проверить значение пропса isOpen и добавить класс "popup_opened", если он равен true. Если пропс isOpen равен false, то класс не добавляется
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__save" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
