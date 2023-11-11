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
      <PlayArea
        range={range}
        proposallength={proposallength}
        type={type}
        operator={operator}
        setWinCounter={setWinCounter}
        winCounter={winCounter}
      />
      <div className="scoreBoard">{winCounter}</div>
    </div>
  );
};

export default Game1;
