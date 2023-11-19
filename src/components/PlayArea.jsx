// import Calculation from "./Calculation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { uid } from "uid"; //pre-requis : npm install uid
import numberTable from "./numberTable";
import { Fireworks } from "fireworks-js";

function PlayArea({
  range,
  proposallength,
  operator,
  type,
  winCounter,
  setWinCounter,
  gamesStatus,
  setGameStatus,
}) {
  const [otherProposalState, setotherProposalState] = useState([]);
  const [numberDeltaState, setNumberDeltaState] = useState(0);
  const [finalNumberState, setfinalNumberState] = useState(0);
  const [numberToGuessState, setnumberToGuessState] = useState(0);
  const [playerchoicednumber, setplayerchoicednumber] = useState("?");
  const [joker1, setJoker1] = useState(true);
  const [joker2, setJoker2] = useState(true);
  const [joker3, setJoker3] = useState(true);

  //add condition if > 1 on actual table lengh

  function joker() {
    const tempoOtherproposal = otherProposalState;
    const tempoOtherproposalLength = tempoOtherproposal.length;
    if (tempoOtherproposalLength > 1) {
      const newtablelength = Math.ceil(tempoOtherproposalLength / 2);
      for (let i = 0; i < newtablelength; i++) {
        const rdmsplice = Math.floor(Math.random() * newtablelength);
        if (tempoOtherproposal[rdmsplice] != numberToGuessState) {
          tempoOtherproposal.splice(rdmsplice, 1);
        } else {
          i--;
        }
      }
      console.log(tempoOtherproposal);
      setotherProposalState(tempoOtherproposal);
      console.log("fin useffect");
    }
  }

  function FireWorkFunction() {
    const container = document.querySelector(".centerArea");
    const fireworks = new Fireworks(container, {
      autoresize: true,
      /* options */
    });
    fireworks.start();
  }

  function handleClickNewGame() {
    window.location.reload(false);
  }

  function calcul() {
    setGameStatus(true);
    let otherproposal = [];
    setplayerchoicednumber("?");

    // ici on calcul les valeurs du jeu (de manière aléatoire mais selon range choisi par l'utilisateur via la difficulté)

    let numberDelta = 0;
    let finalNumber = 0;
    let numberToGuess = 0;
    //rappel : while loop only runs if its condition is true
    do {
      finalNumber = Math.ceil(Math.random() * range); //Exemple 10
    } while (finalNumber <= 1); //Exemple 4
    if (operator === "+") {
      do {
        numberToGuess = Math.ceil(Math.random() * range);
      } while (numberToGuess > finalNumber); //Exemple 4
      numberDelta = finalNumber - numberToGuess; // Exemple 6
    } else if (operator === "-") {
      do {
        finalNumber = Math.ceil(Math.random() * range);
        numberDelta = Math.ceil(Math.random() * range);
        numberToGuess = numberDelta - finalNumber;
      } while (numberToGuess <= 0);
    } else if (operator === "*") {
      do {
        finalNumber = Math.ceil(Math.random() * range);
        numberDelta = Math.ceil(Math.random() * range);
        numberToGuess = finalNumber / numberDelta;
      } while (!Number.isInteger(numberToGuess) || numberDelta >= finalNumber);
    } else if (operator === "/") {
      do {
        finalNumber = Math.ceil(Math.random() * range);
        numberDelta = Math.ceil(Math.random() * range);
        if (finalNumber !== 0) {
          numberToGuess = numberDelta / finalNumber;
        } else {
          numberToGuess = 0;
        }
        console.log(numberToGuess);
        console.log(Number.isInteger(numberToGuess));
      } while (!Number.isInteger(numberToGuess));
    }

    // ici on génère le tableau ("otherproposal" des autres propositions (pour "polluer" le joueur) basé sur la longeur choisi (via la difficulté)

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
        if (winCounter < 4) {
          setTimeout(() => {
            calcul();
          }, 1000);
        } else {
          FireWorkFunction();
          setGameStatus(false);
        }
      }
    }
  }, [playerchoicednumber, numberToGuessState]);

  function scoreBoard(element) {
    setplayerchoicednumber(element);
  }

  return (
    <>
      <div className="playAreaComponent">
        {gamesStatus && (
          <div
            className="btnHomeContainer"
            onClick={() => {
              handleClickNewGame();
            }}
          >
            <img className="btnHome" src="./images/home.png" alt="" />
          </div>
        )}
        <div className="JokerArea">
          {gamesStatus && joker1 && (
            <div className="jokerImageContainer">
              <img
                onClick={() => {
                  joker(), setJoker1(false);
                }}
                className="jokerImage"
                src="./images/wolf_head.png"
                alt=""
              />
              <p>Joker 1</p>
            </div>
          )}
          {gamesStatus && joker2 && (
            <div className="jokerImageContainer">
              <img
                onClick={() => {
                  joker(), setJoker2(false);
                }}
                className="jokerImage"
                src="./images/wolf_head.png"
                alt=""
              />
              <p>Joker 2</p>
            </div>
          )}
          {gamesStatus && joker3 && (
            <div className="jokerImageContainer">
              <img
                onClick={() => {
                  joker(), setJoker3(false);
                }}
                className="jokerImage"
                src="./images/wolf_head.png"
                alt=""
              />
              <p>Joker 3</p>
            </div>
          )}
        </div>
        <div className="playArea">
          {operator && type && winCounter === undefined && (
            <div className="PlayBtnArea over left">
              <button
                type="button"
                className="btnStyle1 boucing "
                onClick={() => {
                  setWinCounter(0);
                  calcul();
                }}
              >
                PLAY
              </button>
            </div>
          )}
          {!gamesStatus && numberToGuessState !== 0 && (
            <div className="PlayBtnArea over">
              <button
                type="button"
                className="btnStyle1 boucing"
                onClick={() => {
                  handleClickNewGame();
                }}
              >
                PLAY AGAIN ?
              </button>
            </div>
          )}
          {numberToGuessState != 0 && gamesStatus && (
            <div className="calculArea">
              <div className="topArea">
                <button type="button" className="btnStyle1 choiceBtnsize">
                  {numberDeltaState}
                </button>
              </div>
              <div className="operator topArea">
                <button type="button" className="btnStyle1 choiceBtnsize">
                  {operator}
                </button>
              </div>
              <div className="topArea">
                <button
                  type="button"
                  className={
                    playerchoicednumber == "?"
                      ? "btnStyle3 choiceBtnsize"
                      : playerchoicednumber == numberToGuessState
                      ? "rightAsnwer btnStyle1 choiceBtnsize"
                      : "badAnswer btnStyle1 choiceBtnsize"
                  }
                >
                  {playerchoicednumber}
                  {/* {Math.round(parseInt(playerchoicednumber) * 100) / 100} */}
                </button>
              </div>
              <div className="topArea">
                <button type="button" className="btnStyle1 choiceBtnsize">
                  =
                </button>
              </div>
              <div className="topArea">
                <button type="button" className="btnStyle1 choiceBtnsize">
                  {finalNumberState}
                </button>
              </div>
            </div>
          )}
          <div className="choiceNumberAreaContainer" id="style-7">
            <div className="choiceNumberArea">
              {otherProposalState != 0 &&
                gamesStatus &&
                otherProposalState.map((element) => {
                  return (
                    <div key={uid(10)}>
                      {type != "image" && (
                        <div className="numberChoiceButton">
                          <button
                            className="btnStyle1 choiceBtnsize"
                            type="button"
                            value={element} //si on est sur une image ou letter, alors l'index du tableau fait un décalage (départ à index 0)
                            onClick={() => scoreBoard(element)}
                          >
                            {type === "number"
                              ? Math.round(element * 100) / 100
                              : type === "letter" &&
                                numberTable[element - 1].numberText}
                          </button>
                        </div>
                      )}

                      {type === "image" && (
                        <div className="numberimagecontainer">
                          <img
                            onClick={() => scoreBoard(element)}
                            className="numberimage"
                            src={numberTable[element - 1].numberImg}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
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
  gamesStatus: PropTypes.bool,
  setGameStatus: PropTypes.func,
};

export default PlayArea;
