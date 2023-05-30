import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const avatarRef = useRef(null); // создание рефа для инпута аватара, записываем объект, возвращаемый хуком, в переменную

  useEffect(() => {
    avatarRef.current.value = "";
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      resetForm(); // вызов resetForm перед отправкой данных
      onUpdateAvatar({
        avatar: avatarRef.current.value, // получение значения инпута через реф
      });
    }
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        required
        className="popup__input popup__input_type_avatar-link"
        type="url"
        name="avatar"
        id="inputAvatarLink"
        placeholder="Ссылка на картинку"
        ref={avatarRef} // передача рефа в инпут
        value={values.avatar} // добавить значение из useFormAndValidation
        onChange={handleChange} // добавить обработчик изменений
      />
      <span className="inputAvatarLink-error popup__input-error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
