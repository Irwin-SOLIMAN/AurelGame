// import Calculation from "./Calculation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { uid } from "uid"; //pre-requis : npm install uid
import numberTable from "./numberTable";
import { Fireworks } from 'fireworks-js'

function PlayArea({
  range,
  proposallength,
  operator,
  type,
  winCounter,
  setWinCounter,
  setRange,
  setType,
  setOperator,  
  setproposallength,
}) {
    const [otherProposalState, setotherProposalState] = useState([]);
    const [numberDeltaState, setNumberDeltaState] = useState(0);
    const [finalNumberState, setfinalNumberState] = useState(0);
    const [numberToGuessState, setnumberToGuessState] = useState(0);
    const [playerchoicednumber, setplayerchoicednumber] = useState("?");



    function FireWorkFunction() {
      const container = document.querySelector('.App')
      const fireworks = new Fireworks(container, { /* options */ })
      fireworks.start()
        setTimeout(() => {
          fireworks.stop()
      },10000)

    }

    function calcul() {
      let otherproposal = [];
      setplayerchoicednumber("?");

      // ici on calcul les valeurs du jeu (de manière aléatoire mais selon range choisi par l'utilisateur via la difficulté)

      let numberDelta = 0;
      let finalNumber = 0;
      let numberToGuess = 0;

      if (operator === "+") {
        finalNumber = Math.ceil(Math.random() * range); //Exemple 10
        do {
          numberToGuess = Math.ceil(Math.random() * range);
        } while (numberToGuess >= finalNumber); //Exemple 4
        numberDelta = finalNumber - numberToGuess; // Exemple 6
      } else if (operator === "-") {
        finalNumber = Math.ceil(Math.random() * range); //Exemple 10
        numberDelta = Math.ceil(Math.random() * range); //Exemple 20
        do {
          numberDelta = Math.ceil(Math.random() * range);
        } while (numberDelta <= finalNumber);
        numberToGuess = numberDelta - finalNumber;
      }

      console.log(numberToGuess)

      // ici on génère le tableau ("otherproposal" des autres propositions (pour "polluer" le joueur) basé sur la longeur choisi (via la difficulté)
      console.log("la length :");
      console.log(proposallength);
      for (let i = 0; i < proposallength; i++) {
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
        const randomsplice = Math.ceil(Math.random() * (proposallength - 1)); //on détermine un nombre aléatoire (dans la plage de la longeur des choix). le -1 car l'index des tableau commence à 0
        otherproposal.splice(randomsplice, 1, numberToGuess); // on retire une des propositions aélatoire du tableau pour y intégrer notre solution
      }

      setfinalNumberState(finalNumber);
      setnumberToGuessState(numberToGuess);
      setNumberDeltaState(numberDelta);
      setotherProposalState(otherproposal);
    }

    useEffect(() => {
      if (playerchoicednumber == numberToGuessState) {
        if (winCounter === undefined) {
          setWinCounter(1);
        } else {
          setWinCounter(winCounter + 1);
            if(winCounter<4) {
              setTimeout(() => {
                calcul();
                setplayerchoicednumber("?");
              }, 1000);
            }
            else {
              FireWorkFunction()  
              setTimeout(() => {
                setWinCounter(undefined)
                setType(undefined)
                setOperator(undefined)
                setproposallength(7)
                setRange(7)
                setfinalNumberState(0);
                setnumberToGuessState(0);
                setNumberDeltaState(0);
                setotherProposalState(0);
              },10000)
             }
        }
      }
    }, [playerchoicednumber, numberToGuessState]);

  function scoreBoard(element) {
   
      setplayerchoicednumber(element);
  }

  return (
   
    <div className="playArea">
      {operator && type && (winCounter === undefined) && (
        <div className="PlayBtnArea">
          <button
            type="button"
            className="btnStyle1 boucing"
            onClick={() => {
              setWinCounter(0);
              calcul();
            }}
          >
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
                  ? "btnStyle3"
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

        {otherProposalState != 0 && otherProposalState.map((element) => {
          return (
            <div key={uid(10)}>
              {type != "image" && (
                <div className="numberChoiceButton">
                  <button
                    className="btnStyle1"
                    type="button"
                    value={element} //si on est sur une image ou letter, alors l'index du tableau fait un décalage (départ à index 0)
                    onClick={() => scoreBoard(element)}
                  >
                    {type === "number"
                      ? element
                      : type === "letter" && numberTable[element-1].numberText}
                  </button>
                </div>
              )}
              {type === "image" && (
                <div className="numberimagecontainer">
                  <img
                    onClick={() => scoreBoard(element)}
                    className="numberimage"
                    src={numberTable[element-1].numberImg}
                    alt=""
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
   
  );
 
}

PlayArea.propTypes = {
  range: PropTypes.number,
  proposallength: PropTypes.number,
  operator: PropTypes.string,
  type: PropTypes.string,
  winCounter: PropTypes.number,
  setWinCounter: PropTypes.func,
  setRange: PropTypes.func,
  setType: PropTypes.func,
  setproposallength: PropTypes.func,
  setOperator: PropTypes.func,
};

export default PlayArea;
