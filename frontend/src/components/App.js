import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import Login from "./Login.js";
import * as auth from "../utils/auth.js";
import InfoToolTip from "./InfoToolTip.js";

function App() {
  //три переменные состояния и три функции, которые будут менять их значения
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  //const [isLoading, setIsLoading] = useState(false); //отслеживаем загрузку карточек

  //из пр12
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    api
      .getUserInfo()
      .then((profileInfo) => setCurrentUser(profileInfo))
      .catch((err) => {
        console.log(`Ошибка загрузки профиля из api: ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          }))
        );
      })
      .catch((err) => {
        console.log(`Ошибка загрузки карточек из api: ${err}`);
      });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log("401 — Переданный токен некорректен");
        });
    }
  }, [history]);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoToolTipPopupOpen(false);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    // api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    //   setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    // });
    if (isLiked) {
      api
        .deleteLikeStatus(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при удалении лайка: ${err}`);
        });
    } else {
      api
        .changeLikeCardStatus(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при добавлении лайка: ${err}`);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteOwnerCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((profileInfo) => {
        setCurrentUser(profileInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования профиля: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования аватара профиля: ${err}`);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    console.log("newCard:", newCard);
    api
      .addNewCard(newCard)
      .then((card) => {
        console.log("card:", card);
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления нового места: ${err}`);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          {/* Поддерево, в котором будет доступен контекст */}
          <Header
            email={email}
            onSignOut={handleSignOut}
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              component={Main}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLoginSubmit} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegisterSubmit} />
            </Route>

            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          {isLoggedIn && <Footer />}

          {/* PREVIEW IMAGE POPUP */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          {/* POPUP EDIT PROFILE */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* RENEW AVATAR POPUP */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* ADD POPUP */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          {/* DELETE CARD POPUP */}
          <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            buttonText="Да"></PopupWithForm>

          <InfoToolTip
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
