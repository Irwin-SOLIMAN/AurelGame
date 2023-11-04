// import Calculation from "./Calculation";
import PropTypes from "prop-types";
import { useState } from "react";
import { uid } from "uid"; //pre-requis : npm install uid
import numberTable from "./numberTable";

function PlayArea({ range, length, operator, type }) {
  const [otherProposalState, setotherProposalState] = useState([]);
  const [numberDeltaState, setNumberDeltaState] = useState(0);
  const [finalNumberState, setfinalNumberState] = useState(0);
  const [numberToGuessState, setnumberToGuessState] = useState(0);
  const [playerchoicednumber, setplayerchoicednumber] = useState("?");

  function calcul() {
    let otherproposal = [];

    // ici on calcul les valeurs du jeu (de manière aléatoire mais selon range choisi par l'utilisateur via la difficulté)

    let numberDelta = 0;
    let finalNumber = 0;
    let numberToGuess = 0;

    if (operator === "+") {
      finalNumber = Math.ceil(Math.random() * range); //Exemple 10
      numberToGuess = Math.ceil(Math.random() * range); //Exemple 4
      numberDelta = finalNumber - numberToGuess; // Exemple 6
    } else if (operator === "-") {
      finalNumber = Math.ceil(Math.random() * range); //Exemple 10
      numberDelta = Math.ceil(Math.random() * range); //Exemple 20
      do {
        numberDelta = Math.ceil(Math.random() * range);
      } while (numberDelta <= finalNumber);
      numberToGuess = numberDelta - finalNumber;
    }

    // ici on génère le tableau ("otherproposal" des autres propositions (pour "polluer" le joueur) basé sur la longeur choisi (via la difficulté)
    console.log("la length :");
    console.log(length);
    for (let i = 0; i < length; i++) {
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
      const randomsplice = Math.ceil(Math.random() * (length - 1)); //on détermine un nombre aléatoire (dans la plage de la longeur des choix). le -1 car l'index des tableau commence à 0
      console.log("le nombre randoomsplice :" + randomsplice);
      otherproposal.splice(randomsplice, 1, numberToGuess); // on retire une des propositions aélatoire du tableau pour y intégrer notre solution
    }

    setfinalNumberState(finalNumber);
    setnumberToGuessState(numberToGuess);
    setNumberDeltaState(numberDelta);
    setotherProposalState(otherproposal);
  }

  return (
    <div className="playArea">
      {operator && type && (
        <div className="PlayBtnArea">
          <button type="button" className="btnStyle1" onClick={() => calcul()}>
            PLAY
          </button>
        </div>
      )}
      {numberToGuessState != 0 && (
        <div className="calculArea">
          <div className="topArea">
            <button type="button" className="btnStyle1">
              {numberDeltaState}
            </button>
          </div>
          <div className="operator topArea">
            <button type="button" className="btnStyle1">
              {operator}
            </button>
          </div>
          <div className="topArea">
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
          <div className="topArea">
            <button type="button" className="btnStyle1">
              =
            </button>
          </div>
          <div className="topArea">
            <button type="button" className="btnStyle1">
              {finalNumberState}
            </button>
          </div>
        </div>
      )}

      <div className="choiceNumberArea">
        {otherProposalState.map((element) => {
          return (
            <div className="numberChoiceButton" key={uid(10)}>
              <button
                className="btnStyle1"
                type="button"
                value={type != "number" ? element+1 : element} //si on est sur une image ou letter, alors l'index du tableau fait un décalage (départ à index 0)
                onClick={(e) => setplayerchoicednumber(e.target.value)}
              >
                {type === "number"
                  ? element
                  : type === "letter"
                  ? numberTable[element].numberText
                  : type === "image" && (
                      <img
                        className="numberimage"
                        src={numberTable[element].numberImg}
                        alt=""
                        value={type != "number" ? element+1 : element}
                        // onClick={ () => alert("coucou!")}
                        onClick={(e) => setplayerchoicednumber(e.target.value)}
                      />
                    )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

PlayArea.propTypes = {
  range: PropTypes.number,
  length: PropTypes.number,
  operator: PropTypes.string,
  type: PropTypes.string,
};

export default PlayArea;
