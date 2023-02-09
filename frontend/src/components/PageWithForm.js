import React from "react";
function PageWithForm(props) {
  return (
    <div className={`form`}>
      <div
        className="form__container">
        <h2 className="form__title form__title_place_page">{props.title}</h2>
        <form
          name={`form-${props.name}`}
          className={`form__container form__container_place_page`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className="button form__button form__button_place_page"
          >
            {props.btnName}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PageWithForm;
