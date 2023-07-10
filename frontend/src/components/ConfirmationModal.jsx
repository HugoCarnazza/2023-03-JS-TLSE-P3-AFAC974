/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import RedButton from "./RedButton";
import GreyButton from "./GreyButton";
import { FormArtworkArtistContext } from "../context/FormArtworkArtistContext";

function ConfirmationModal({
  isOpenModalConfirmation,
  setModalConfirmation,
  textConfirmationModal,
  setStep,
  setModalValidation,
  handleExecution,
  isLoadedArtist,
  isLoadedType,
  isLoadedTechnique,
  isLoadedArtTrend,
  handleCancel,
  add,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };
  const {
    setFormArtwork,
    setFormArtist,
    setFormType,
    setFormArtTrend,
    setFormTechnique,
    setFormArtistTechnique,
    setFormArtTrendArtist,
    setArtist,
    setType,
    setArtTrend,
    setTechnique,
    setArtworkPreview,
    setArtistPreview,
    formArtwork,
  } = useContext(FormArtworkArtistContext);

  const endRequest = () => {
    setStep(1);
    setModalConfirmation(false);
    setModalValidation(true);
    setFormArtwork({
      name: "",
      year: 0,
      description: "",
      imageUrlSmall: "",
      imageUrlMedium: "",
      imageUrlLarge: "",
      artTrendId: "",
      typeId: "",
      techniqueId: "",
      artistId: "",
      widthCm: 0,
      heightCm: 0,
      depthCm: 0,
      artworkLocation: "",
    });
    setFormArtist({
      lastname: "",
      firstname: "",
      nickname: "",
      description: "",
      imageUrlSmall: "",
      imageUrlMedium: "",
      imageUrlLarge: "",
      websiteUrl: "",
      facebookUrl: "",
      instagramUrl: "",
      twitterUrl: "",
    });
    setFormType({
      name: "",
    });
    setFormArtTrend({
      name: "",
    });
    setFormTechnique({
      name: "",
    });
    setFormArtistTechnique({
      artistId: "",
      techniqueId: "",
    });
    setFormArtTrendArtist({
      artistId: "",
      artTrendId: "",
    });
    setArtist("");
    setType("");
    setArtTrend("");
    setTechnique("");
    setArtworkPreview("");
    setArtistPreview("");
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.myfile.length > 0) {
      const artworkPictureData = new FormData();
      artworkPictureData.append("myfile", data.myfile[0]);

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/upload`, artworkPictureData)
        .then((res) => {
          const temporary = {
            ...formArtwork,
            imageUrlMedium: res.data.imageUrl,
          };
          handleExecution(temporary);
        })
        .then(() => {
          endRequest();
        })
        .catch((error) => {
          console.error("Une erreur s'est produite :", error);
        });
    } else {
      handleExecution(formArtwork);
      endRequest();
    }
  };

  return (
    <ReactModal
      isOpen={isOpenModalConfirmation}
      onRequestClose={handleCancel}
      style={customModalStyles}
      ariaHideApp={false}
      className="h-fit md:h-[30vh] lg:h-[35vh] w-fit md:w-[30vw] lg:w-[30vw] lg:max-w-[25vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
    >
      <div className="flex flex-col justify-center items-center w-[100%]">
        <p className="font-semibold text-[20px] py-[10px] text-center">
          {textConfirmationModal}
        </p>
        <div className="flex flex-col-reverse justify-between w-[75%]">
          <div className="w-[100%] py-[5px] text-[16px] h-[55px]">
            <GreyButton text="Annuler" onClick={handleCancel} />
          </div>
          <div className="w-[100%] py-[5px] text-[16px] h-[55px]">
            {add ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("myfile")} type="file" />
                <RedButton text="Confirmer" type="submit" />
              </form>
            ) : (
              <RedButton
                text="Confirmer"
                onClick={() => {
                  if (
                    isLoadedArtTrend &&
                    isLoadedArtist &&
                    isLoadedTechnique &&
                    isLoadedType
                  ) {
                    handleExecution();
                  }
                  endRequest();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

ConfirmationModal.propTypes = {
  isOpenModalConfirmation: PropTypes.bool,
  setModalConfirmation: PropTypes.func,
  textConfirmationModal: PropTypes.string,
  setStep: PropTypes.func,
  setModalValidation: PropTypes.func,
  handleExecution: PropTypes.func.isRequired,
  isLoadedArtist: PropTypes.bool,
  isLoadedType: PropTypes.bool,
  isLoadedTechnique: PropTypes.bool,
  isLoadedArtTrend: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired,
  add: PropTypes.bool,
};

ConfirmationModal.defaultProps = {
  isOpenModalConfirmation: false,
  setModalConfirmation: () => {},
  textConfirmationModal: "",
  setStep: () => {},
  setModalValidation: () => {},
  add: false,
  isLoadedArtist: false,
  isLoadedType: false,
  isLoadedTechnique: false,
  isLoadedArtTrend: false,
};

export default ConfirmationModal;
