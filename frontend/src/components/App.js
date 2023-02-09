import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Header from "./Header";
import Register from "./Register";
import * as mestoAuth from "../utils/mestoAuth.js";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import imageOkPath from "../images/UnionOk.svg";
import imageNOkPath from "../images/UnionNOk.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [imageInfoTooltip, setImageInfoTooltip] = useState("");
  const [textInfoTooltip, setTextInfoTooltip] = useState("");
  const [linkInfoTooltip, setLinkInfoTooltip] = useState("");
  const [cards, setCards] = useState([]);
  const history = useHistory();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCheckToken() {
    const token = localStorage.getItem("jwt");
      mestoAuth.getContent(token).then((res) => {
        if (res) {
          let userEmail = res.email;
          setUserEmail(userEmail);
          setLoggedIn(true);
          setCurrentUser(res);
          history.push("/");
        }
      })
      .catch((err) => {
        setUserEmail(" ");
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.removeItem("jwt");
        console.log("Ошибка при получении token", err);
      })
  }

  useEffect(() => {
      handleCheckToken()
  }, []);

  useEffect(() => {
    if (loggedIn) {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [loggedIn]);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltip(false);
  };

  const [selectedCard, setSelectedCard] = useState(null);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUserInfo(data.name, data.about)
      .then((formData) => {
        setCurrentUser(formData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при редактировании профиля", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editUserAvatar(data.avatar)
      .then((formData) => {
        setCurrentUser(formData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при редактировании аватара", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
  if (loggedIn) {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .addLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при установке лайка: ${err}`);
        });
    } else {
      api
        .removeLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при удалении лайка: ${err}`);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err}`);
      });
  }

  function handleUpdatePlaces(data) {
    setIsLoading(true);
    api
      .createCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка при добавлении новой карточки", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegistr(email, password) {
    mestoAuth
      .register(email, password)
      .then((res) => {
        if (res.status !== 200) {
          // history.push("/sign-in");
          setImageInfoTooltip(imageOkPath);
          setTextInfoTooltip("Вы успешно зарегистрировались!");
          setLinkInfoTooltip("/sign-in");
        }
      })
      .catch((err) => {
        setImageInfoTooltip(imageNOkPath);
        setTextInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.");
        console.log("Ошибка", err);
        setLinkInfoTooltip("/sign-up");
      })
      .finally(() => {
        setIsInfoTooltip(true);
      });
  }

  function handleLogin(email, password) {
    mestoAuth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleCheckToken()
        }
      })
      .catch((err) => {
        setImageInfoTooltip(imageNOkPath);
        setTextInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.");
        console.log("Ошибка", err);
        setLinkInfoTooltip("/sign-in");
      })
      .finally(() => {
        setIsInfoTooltip(true);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setUserEmail("");
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header userEmail={userEmail} onSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
            />
            <Route path="/sign-up">
              <Register onRegistr={handleRegistr} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleUpdatePlaces}
            isLoading={isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            imageInfoTooltip={imageInfoTooltip}
            textInfoTooltip={textInfoTooltip}
            linkInfoTooltip={linkInfoTooltip}
            loggedIn={loggedIn}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
