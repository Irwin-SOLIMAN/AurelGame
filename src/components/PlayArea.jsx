// import Calculation from "./Calculation";
import PropTypes from "prop-types";
import { useState } from "react";
import { uid } from "uid"; //pre-requis : npm install uid

function PlayArea({ difficulty }) {
  const [otherProposalState, setotherProposalState] = useState([]);
  const [numberDeltaState, setNumberDeltaState] = useState(0);
  const [finalNumberState, setfinalNumberState] = useState(0);
  const [numberToGuessState, setnumberToGuessState] = useState(0);
  const [playerchoicednumber, setplayerchoicednumber] = useState("?");
  let requestLength = 0;
  let range = 0;

  function calcul() {
    let otherproposal = [];
    // selon la difficulté choisi, on applique une range (ex chiffre de 0 à 10 et une requestLength exemple 5 autres proposition)
    if (difficulty === 1) {
      requestLength = 5;
      range = 10;
    } else if (difficulty === 2) {
      requestLength = 10;
      range = 20;
    } else if (difficulty === 3) {
      requestLength = 20;
      range = 50;
    } else if (difficulty === 4) {
      requestLength = 30;
      range = 100;
    }

    // ici on calcul les valeurs du jeu (de manière aléatoire mais selon range choisi par l'utilisateur via la difficulté)

    const finalNumber = Math.ceil(Math.random() * range); //Exemple 10
    const numberToGuess = Math.ceil(Math.random() * range); //Exemple 4
    const NumberDelta = finalNumber - numberToGuess; // Exemple 6

    // ici on génère le tableau ("otherproposal" des autres propositions (pour "polluer" le joueur) basé sur la longeur choisi (via la difficulté)

    for (let i = 0; i < requestLength; i++) {
      let number = Math.ceil(Math.random() * range);
      const check = otherproposal.find((element) => element === number); // on vérifie si ce nombre est déjà présent dans le tableau
      if (check) {
        i--; //si déjà présent alors on refait un tour de plus (et on ne met pas le chiffre trouvé dans le tableau )
      } else {
        otherproposal.push(number); //sinon, on met ce nouveau chiffre dans le tableau
      }
    }

    const check = otherproposal.find((element) => element === numberToGuess); // on vérifie si le nombre à deviner est déjà présent dans le tableau de proposal "unique"
    if (!check) {
      const randomsplice = Math.ceil(Math.random() * (requestLength - 1)); //on détermine un nombre aléatoire (dans la plage de la longeur des choix). le -1 car l'index des tableau commence à 0
      console.log("le nombre randoomsplice :" + randomsplice);
      otherproposal.splice(randomsplice, 1, numberToGuess); // on retire une des propositions aélatoire du tableau pour y intégrer notre solution
    }

    setfinalNumberState(finalNumber);
    setnumberToGuessState(numberToGuess);
    setNumberDeltaState(NumberDelta);
    setotherProposalState(otherproposal);
  }

  return (
    <div className="playArea">
      {difficulty != undefined && ( //génère le bouton Play si un choix de difficulté à été fait
        <div className="PlayBtnArea">
          <button type="button" className="btnStyle1" onClick={() => calcul()}>
            PLAY
          </button>
        </div>
      )}

      {numberToGuessState != 0 && (
        <div className="calculArea">
          <div className="">
            <button type="button" className="btnStyle1">
              {numberDeltaState}
            </button>
          </div>
          <div className="">
            <button type="button" className="btnStyle1">
              +
            </button>
          </div>
          <div className="">
            <button
              type="button"
              className={
                playerchoicednumber == "?"
                  ? "btnStyle1"
                  : playerchoicednumber == numberToGuessState
                  ? "rightAsnwer btnStyle1"
                  : "badAnswer btnStyle1"
              }
            >
              {playerchoicednumber}
            </button>
          </div>
          <div className="">
            <button type="button" className="btnStyle1">
              =
            </button>
          </div>
          <div className="">
            <button type="button" className="btnStyle1">
              {finalNumberState}
            </button>
          </div>
        </div>
      )}

      <div className="choiceNumberArea">
        {otherProposalState.map((element) => {
          return (
            <div className="" key={uid(10)}>
              <button
                className="btnStyle1"
                type="button"
                value={element}
                onClick={(e) => setplayerchoicednumber(e.target.value)}
              >
                {element}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
PlayArea.propTypes = {
  difficulty: PropTypes.number,
};

export default PlayArea;
