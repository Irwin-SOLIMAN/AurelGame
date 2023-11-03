import { useState } from "react";
import PlayArea from "../components/PlayArea";
import Setting from "../components/Setting";

const Game1 = () => {
  const [range, setRange] = useState(5);
  const [length, setLength] = useState(5);
  const [type, setType] = useState(undefined);
  const [operator, setOperator] = useState(undefined);

  return (
    <div className="game1">
      <Setting
        setRange={setRange}
        length={length}
        type={type}
        operator={operator}
        range={range}
        setLength={setLength}
        setType={setType}
        setOperator={setOperator}
      />
      <PlayArea range={range} length={length} type={type} operator={operator} />
    </div>
  );
};

export default Game1;
