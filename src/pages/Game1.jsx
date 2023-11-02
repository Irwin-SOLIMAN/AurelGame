import DifficultyArea from "../components/DifficultyArea";
// import numberTable from "../components/numberTable";
import { useState } from "react";
import PlayArea from "../components/PlayArea";

const Game1 = () => {
  const [difficulty, setDifficulty] = useState(undefined);

  return (
    <div className="game1">
      <DifficultyArea setDifficulty={setDifficulty} difficulty={difficulty} />
      <PlayArea difficulty={difficulty} />
    </div>
  );
};

export default Game1;
