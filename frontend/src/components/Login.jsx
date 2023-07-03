import React, { useState } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import Input from "./Input";
import userSample from "../assets/user_sample.png";

function Login({ loginModalOpened, setLoginModalOpened }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    pseudo: "",
    email: "",
    entity_id: "",
    password: "",
    role: "",
  });

  function handleNext() {
    setCurrentStep(currentStep + 1);
  }

  function handlePrev() {
    setCurrentStep(currentStep - 1);
  }

  function handleInputChange(event) {
    const { id, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  }

  function submitSigninModal() {
    setCurrentStep(1);
    setLoginModalOpened(false);
    setUser({});
  }

  function submitLoginModal() {
    setCurrentStep(1);
    setLoginModalOpened(false);
    setUser({});
  }

  function renderContent() {
    switch (currentStep) {
      case 0:
        return (
          <div className="loginModal flex flex-col items-center gap-5">
            <button type="button">
              <div className="imageCircleContainer w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden ">
                <img
                  src={userSample}
                  alt="profile sample"
                  className="object-cover w-full h-full"
                />
              </div>
            </button>
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px]">
              <h3>Email</h3>
              <Input
                id="email"
                type="email"
                placeholder="user@domain.com"
                value={user.email}
                onChange={(event) => handleInputChange(event)}
              />
              <h3>Mot de passe</h3>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(event) => handleInputChange(event)}
              />
            </form>
            <button
              onClick={() => submitLoginModal()}
              type="button"
              className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base  hover:font-bold"
            >
              Connexion
            </button>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center gap-5">
            <p className="text-4xl font-semibold">Bienvenue</p>
            <p className="text-xl font-semibold">Choisissez une option</p>
            <div className="flex flex-col gap-3">
              <button
                className="w-[70vw] sm:w-[350px] sm h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base hover:font-bold"
                type="button"
                onClick={() => setCurrentStep(0)}
              >
                <p>Connexion</p>
              </button>
              <button
                className="w-[70vw] sm:w-[350px] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
                onClick={() => setCurrentStep(2)}
                type="button"
              >
                <p>Inscription</p>
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-between gap-5">
            <p className="text-3xl font-semibold text-[#257492]">
              INSCRIPTION 1/3
            </p>
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px]">
              <h3>Nom*</h3>
              <label htmlFor="lastname">
                <Input
                  type="text"
                  id="lastname"
                  name="userLastname"
                  placeholder="Saisissez votre nom"
                  onChange={(event) => handleInputChange(event)}
                  value={user.lastname}
                />
              </label>
              <h3>Prénom*</h3>
              <label htmlFor="firstname">
                <Input
                  type="text"
                  id="firstname"
                  name="userFirstname"
                  placeholder="Saisissez votre prénom"
                  onChange={(event) => handleInputChange(event)}
                  value={user.firstname}
                />
              </label>
              <h3>Adresse email*</h3>
              <label htmlFor="email">
                <Input
                  type="email"
                  id="email"
                  name="userEmail"
                  placeholder="Saisissez votre adresse email"
                  onChange={(event) => handleInputChange(event)}
                  value={user.email}
                />
              </label>
              <h3>Etablissement</h3>
              <label htmlFor="entity_id">
                <Input
                  type="text"
                  id="entity_id"
                  name="userEntity"
                  placeholder="Saisissez votre entité"
                  onChange={(event) => handleInputChange(event)}
                  value={user.entity_id}
                />
              </label>
            </form>

            <button
              onClick={() => handleNext()}
              type="button"
              className="w-[70vw] sm:w-[350px] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
            >
              Suivant
            </button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-between gap-5">
            <p className="text-3xl font-semibold text-[#257492]">
              INSCRIPTION 2/3
            </p>
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px] ">
              {/* crée les inputs pseudo / mot de passe / confirmer mot de passe */}
              <h3>Pseudo*</h3>
              <label htmlFor="pseudo">
                <Input
                  type="text"
                  id="pseudo"
                  name="userPseudo"
                  placeholder="Saisissez votre pseudo"
                  onChange={(event) => handleInputChange(event)}
                  value={user.pseudo}
                />
              </label>
              <h3>Mot de passe*</h3>
              <label htmlFor="password">
                <Input
                  type="password"
                  id="password"
                  name="userPassword"
                  placeholder="Saisissez votre mot de passe"
                  onChange={(event) => handleInputChange(event)}
                  value={user.password}
                />
              </label>
              <h3>Confirmer mot de passe*</h3>
              <label htmlFor="password">
                <Input
                  type="password"
                  id="password2"
                  name="userConfirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  onChange={(event) => handleInputChange(event)}
                  value={user.password2}
                />
                {user.password !== user.password2 && user.password !== "" && (
                  <p className="text-red-500">
                    Les mots de passe ne correspondent pas
                  </p>
                )}
              </label>
            </form>
            <div className="buttons flex justify-between w-[100%] px-[16px] ">
              <button
                onClick={handlePrev}
                type="button"
                className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
              >
                Précédent
              </button>

              <button
                onClick={() =>
                  user.password !== "" && user.password === user.password2
                    ? handleNext()
                    : null
                }
                type="button"
                className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
              >
                Suivant
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center gap-5">
            <p className="text-3xl font-semibold text-[#257492]">
              INSCRIPTION 3/3
            </p>
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px] items-center">
              <button type="button">
                <div className="imageCircleContainer w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden ">
                  <img
                    src={userSample}
                    alt="profile sample"
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>
              <h3 className="text-center">
                Choisir une photo de profil
                <br />
                <span>(optionnel)</span>
              </h3>
            </form>
            <div className="buttons flex justify-between w-[100%] px-[16px] ">
              <button
                onClick={handlePrev}
                type="button"
                className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
              >
                Précédent
              </button>

              <button
                onClick={() => submitSigninModal()}
                type="button"
                className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base  hover:font-bold"
              >
                Terminer
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <ReactModal
      isOpen={loginModalOpened}
      onRequestClose={() => {
        setCurrentStep(1);
        setLoginModalOpened(false);
        setUser({});
      }}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
          height: "fit-content",
          width: "fit-content",
          maxWidth: "90vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
        },
      }}
    >
      {renderContent()}
    </ReactModal>
  );
}

Login.propTypes = {
  loginModalOpened: PropTypes.bool.isRequired,
  setLoginModalOpened: PropTypes.func.isRequired,
};

export default Login;
