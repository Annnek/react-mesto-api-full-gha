import IconSuccess from "../images/IconSuccess.svg";
import IconFail from "../images/IconFail.svg";
import React from "react";

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}>
      <div className="popup__content">
        {props.isSuccess ? (
          <>
            <img
              src={`${IconSuccess}`}
              alt="Регистрация прошла успешно."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              src={`${IconFail}`}
              alt="Регистрация не была выполнена."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}

        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
