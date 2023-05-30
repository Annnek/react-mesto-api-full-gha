import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const formRef = useRef(null);

  // const [formValues, setFormValues] = useState({
  //   name: "",
  //   link: "",
  // });

  // useEffect(() => {
  //   setFormValues({
  //     name: "",
  //     link: "",
  //   });
  // }, [isOpen]);

  // function handleInputChange(e) {
  //   const { name, value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // }

  //сброс значений формы с помощью функции resetForm, когда изменяется значение isOpen
  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  // проверка на валидность формы перед отправкой данных
  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onAddPlace({
        name: values.name,
        link: values.link,
      });
      formRef.current.reset();
    }
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <form ref={formRef}>
        {" "}
        {/* Применяем ref к форме */}
        <input
          className="popup__input popup__input_type_place"
          type="text"
          name="name"
          id="inputPlace"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={values.name} // валидация
          onChange={handleChange} // валидация
        />
        <span className="inputPlace-error popup__input-error">
          {errors.name}
        </span>
        <input
          className="popup__input popup__input_type_place-link"
          type="url"
          name="link"
          id="inputPlaceLink"
          placeholder="Ссылка на картинку"
          required
          value={values.link} //валидация
          onChange={handleChange} //валидация
        />
        <span className="inputPlaceLink-error popup__input-error">
          {errors.link}
        </span>
      </form>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
