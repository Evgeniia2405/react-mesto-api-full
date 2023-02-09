import React from "react";
function PopupWithForm(props) {
  return (
    <div
      className={`popup ${
        props.isOpen ? "popup_opened" : ""
      } popup_theme_light`}
      onClick={props.onClose}
    >
      <div
        className="popup__container popup__container_type_form"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="form__title form__title_place_popup">{props.title}</h2>
        <form
          name={`popup-${props.name}`}
          className={`form__container form__container_place_popup`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className="button form__button form__button_place_popup"
          >
            {props.btnName}
          </button>
        </form>
        <button
          type="button"
          aria-label="Закрыть"
          className="button popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
