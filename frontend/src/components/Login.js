import React, { useState } from "react";
import PageWithForm from "./PageWithForm";


function Login({ onLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    let { email, password } = data;
    onLogin(email, password);
  };

  return (
    <>
      <div className="content content__page">
        <PageWithForm
          title="Вход"
          name="enter"
          btnName={"Войти"}
          onSubmit={handleSubmit}
          children={
            <>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
                className="form__input form__input_place_page"
                value={data.email || ''}
                onChange={handleChange}
              />
              <span id="username-error" className="form__error">
                Вы пропустили это поле.
              </span>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Пароль"
                className="form__input form__input_place_page"
                required
                value={data.password || ''}
                onChange={handleChange}
              />
              <span id="password-error" className="popup__error">
                Вы пропустили это поле.
              </span>
            </>
          }
        />
      </div>
    </>
  );
}

export default Login;
