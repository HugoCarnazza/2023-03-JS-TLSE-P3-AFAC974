import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";

function ArtworkForm2({
  formArtwork,
  handleInputChangeArtwork,
  modalRef,
  prevStep,
  nextStep,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [dataArtist, setDataArtist] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/artists`)
      .then((res) => {
        setDataArtist(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  // console.log(dataArtist);

  const [artist, setArtist] = useState("");

  return (
    <div ref={modalRef} className="h-full flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-[20px]">Informations de l'oeuvre</h2>
      </div>
      <div className="text-[16px] lg:flex flex-col lg:justify-between">
        <div className="lg:flex lg:justify-center lg:gap-4">
          <label htmlFor="artwork_name" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'oeuvre</h3>
            <div>
              <Input
                type="text"
                id="artwork_name"
                name="name"
                placeholder="Saisir le nom de l'oeuvre"
                onChange={handleInputChangeArtwork}
                value={formArtwork.name}
              />
            </div>
          </label>
          <label htmlFor="artist_name_artwork" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'artiste</h3>
            <div>
              {isLoaded ? (
                <select
                  name="artist_id"
                  id="artist-select"
                  className={!artist ? "text-gray-400" : ""}
                  value={artist || ""}
                  onChange={(event) => {
                    setArtist(event.target.value);
                    setInputDisabled(
                      parseInt(event.target.value, 10) !== dataArtist.length + 1
                    );
                    handleInputChangeArtwork(event);
                  }}
                >
                  <option value="" className={artist ? "text-gray-400" : ""}>
                    Artist
                  </option>
                  {dataArtist.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nickname}
                    </option>
                  ))}
                  <option value={dataArtist.length + 1}>Autre</option>
                </select>
              ) : null}
              {inputDisabled === false ? (
                <Input
                  type="text"
                  id="artist_name_artwork"
                  name="artist_id"
                  placeholder="Saisir un nom d'artiste"
                  onChange={handleInputChangeArtwork}
                  value={
                    formArtwork.artist_id !== "3" ? formArtwork.artist_id : ""
                  }
                  inputDisabled={inputDisabled}
                />
              ) : null}
            </div>
          </label>
          <label htmlFor="creationYear" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Année de création</h3>
            <div>
              <Input
                type="text"
                id="creationYear"
                name="year"
                placeholder="Année de création"
                onChange={handleInputChangeArtwork}
                value={formArtwork.year}
              />
            </div>
          </label>
        </div>
        <label
          htmlFor="artwork_description"
          className="w-[100%] lg:w-[70%] lg:justify-start"
        >
          <h3 className="py-4 text-[14px]">Description</h3>
          <div>
            <textarea
              id="artwork_description"
              name="description"
              placeholder="Description"
              onChange={handleInputChangeArtwork}
              value={formArtwork.description}
              className="border border-gray-300 rounded-[4px] p-1 w-[100%] resize-none outline-none overflow-x-hidden"
            />
          </div>
        </label>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <div className="lg:flex lg:justify-center w-[100%]">
            <div className="lg:flex flex-col lg:justify-center">
              <h3 className="py-4  w-[100%] text-[14px]">Dimensions (en cm)</h3>
              <div className="flex justify-between gap-4">
                <label
                  htmlFor="length_artwork"
                  className="flex justify-between items-center w-[100%] gap-2"
                >
                  <h4 className="w-content text-[14px]">L</h4>
                  <div className="lg:w-[40px] xl:w-[50px]">
                    <Input
                      type="text"
                      id="length_artwork"
                      name="length_cm"
                      placeholder=""
                      onChange={handleInputChangeArtwork}
                      value={formArtwork.length_cm}
                    />
                  </div>
                </label>
                <label
                  htmlFor="width"
                  className="flex justify-between items-center w-[100%] gap-2"
                >
                  <h4 className="w-content text-[14px]">l</h4>
                  <div className="lg:w-[40px] xl:w-[50px]">
                    <Input
                      type="text"
                      id="width_artwork"
                      name="width_cm"
                      placeholder=""
                      onChange={handleInputChangeArtwork}
                      value={formArtwork.width_cm}
                    />
                  </div>
                </label>
                <label
                  htmlFor="height_artwork"
                  className="flex justify-between items-center w-[100%] gap-2"
                >
                  <h4 className="w-content text-[14px]">h</h4>
                  <div className="lg:w-[40px] xl:w-[50px]">
                    <Input
                      type="text"
                      id="height_artwork"
                      name="height_cm"
                      placeholder=""
                      onChange={handleInputChangeArtwork}
                      value={formArtwork.height_cm}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <label htmlFor="type_artwork" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Type d'oeuvre</h3>
            <div>
              <Input
                type="text"
                id="type_artwork"
                name="typeArtwork"
                placeholder="Type d'oeuvre"
                onChange={handleInputChangeArtwork}
                value={formArtwork.typeArtwork}
              />
            </div>
          </label>
          <label htmlFor="art_trend_artwork" className="w-[100%]">
            <h3 className="py-4 flex-nowrap text-[14px]">Courant artistique</h3>
            <div>
              <Input
                type="text"
                id="art_trend_artwork"
                name="artTrendArtwork"
                placeholder="Courant artistique"
                onChange={handleInputChangeArtwork}
                value={formArtwork.artTrendArtwork}
              />
            </div>
          </label>
        </div>
      </div>
      <div className="w-full lg:flex lg:justify-center">
        <label htmlFor="artwork_technical" className="w-[100%] lg:w-auto">
          <h3 className="py-4 text-[14px]">Technique</h3>
          <div>
            <Input
              type="text"
              id="artwork_technical"
              name="artworkTechnical"
              placeholder="Technique"
              onChange={handleInputChangeArtwork}
              value={formArtwork.artworkTechnical}
            />
          </div>
        </label>
      </div>
      <div className="flex justify-between py-4 lg:justify-around">
        <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
          <GreyButton text="Précédent" onClick={prevStep} />
        </div>
        <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%] ">
          <RedButton type="submit" text="Suivant" onClick={nextStep} />
        </div>
      </div>
    </div>
  );
}

ArtworkForm2.propTypes = {
  formArtwork: PropTypes.shape({
    name: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.string,
    artTrendArtwork: PropTypes.string,
    typeArtwork: PropTypes.string,
    artworkTechnical: PropTypes.string,
    artist_id: PropTypes.string,
    width_cm: PropTypes.string,
    length_cm: PropTypes.string,
    height_cm: PropTypes.string,
  }),
  handleInputChangeArtwork: PropTypes.func,
  modalRef: PropTypes.shape(),
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
};

ArtworkForm2.defaultProps = {
  formArtwork: {
    name: "",
    year: "",
    description: "",
    artTrendArtwork: "",
    typeArtwork: "",
    artworkTechnical: "",
    artist_id: "",
    width_cm: "",
    length_cm: "",
    height_cm: "",
  },
  handleInputChangeArtwork: () => {},
  modalRef: {},
  prevStep: () => {},
  nextStep: () => {},
};

export default ArtworkForm2;
