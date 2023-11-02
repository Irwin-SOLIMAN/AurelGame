import PropTypes from "prop-types";

const DifficultyArea = ({ setDifficulty }) => {
  return (
    <div className="DifficultyArea">
      <button
        type="button"
        className="btnStyle1"
        onClick={() => setDifficulty(1)} //change la difficulté au click
      >
        Easy
      </button>
      <button
        type="button"
        className="btnStyle1"
        onClick={() => setDifficulty(2)}
      >
        Medium
      </button>
      <button
        type="button"
        className="btnStyle1"
        onClick={() => setDifficulty(3)}
      >
        Hard
      </button>
      <button
        type="button"
        className="btnStyle1"
        onClick={() => setDifficulty(4)}
      >
        Euclide
      </button>
    </div>
  );
};

DifficultyArea.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
  // difficulty: PropTypes.number,
};

export default DifficultyArea;
