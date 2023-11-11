import { useState } from "react";
import PlayArea from "../components/PlayArea";
import Setting from "../components/Setting";

const Game1 = () => {
  const [range, setRange] = useState(7);
  const [proposallength, setproposallength] = useState(7);
  const [type, setType] = useState(undefined);
  const [operator, setOperator] = useState(undefined);
  const [winCounter, setWinCounter] = useState(undefined);

  return (
    <div className="game1">
      <div className="leftArea">
        <Setting
          setRange={setRange}
          proposallength={proposallength}
          type={type}
          operator={operator}
          range={range}
          setproposallength={setproposallength}
          setType={setType}
          setOperator={setOperator}
          winCounter={winCounter}
        />
      </div>
      <div className="centerArea">
        <div className="playAreaComponent" > 
          <PlayArea
            setRange={setRange}
            range={range}
            proposallength={proposallength}
            setproposallength={setproposallength}
            type={type}
            setType={setType}
            operator={operator}
            setOperator={setOperator}
            setWinCounter={setWinCounter}
            winCounter={winCounter}
          />
        </div>
        <div className="scoreBoard">
          {winCounter != undefined &&
            <progress className="progressBar" value={winCounter === undefined ? 0 : winCounter} max={5} />
          }
          
        </div>
      </div>
    </div>
  );
};

export default Game1;
