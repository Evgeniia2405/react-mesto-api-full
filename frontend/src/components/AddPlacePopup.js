import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault(e);
    onAddPlace({ name: name, link: link });
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Новое место"
      name="add"
      isOpen={isOpen}
      btnName={isLoading ? "Сохранение..." : "Создать"}
      onSubmit={handleAddPlaceSubmit}
      children={
        <>
          <label className="form__label">
            <input
              id="placename"
              type="text"
              name="name"
              placeholder="Название"
              className="form__input form__input_place_popup"
              required
              minLength="2"
              maxLength="30"
              value={name || ''}
              onChange={handleNameChange}
            />
            <span id="placename-error" className="form__error">Вы пропустили это поле.</span>
          </label>
          <label className="form__label">
            <input
              id="url"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              className="form__input form__input_place_popup"
              required
              value={link || ''}
              onChange={handleLinkChange}
            />
            <span id="url-error" className="form__error">
            Вы пропустили это поле.
          </span>
          </label>
        </>
      }
    />
  );
}

export default AddPlacePopup;
