// import DifficultyArea from "../components/DifficultyArea";
// import { useState } from "react";
import PropTypes from "prop-types";

const Setting = ({setRange, setType, setLength, setOperator, range, length, type, operator}) => {

    function handleChoiceType (e) {
        setType(e.target.value)
    }

    function handleChoiceOperator (e) {
        setOperator(e.target.value)
    }


  return (
    <>
        <div className="Setting">
            
            <div className="Type">
                <div className="text">Type : </div>
                <button
                    type="button"
                    className={type === "number" ? "btnNumber btnStyle2" : "btnNumber btnStyle1"}
                    value="number"
                    onClick={(e) => handleChoiceType(e)}>
                    Number
                </button>
                <button
                    type="button"
                    className={type === "letter" ? "btnNumber btnStyle2" : "btnNumber btnStyle1"}
                    value ="letter"
                    onClick={(e) => handleChoiceType(e)}>
                    Letter
                </button>
                <button
                    type="button"
                    className={type === "image" ? "btnNumber btnStyle2" : "btnNumber btnStyle1"}
                    value ="image"
                    onClick={(e) => handleChoiceType(e)}>
                    Image
                </button>
            </div>
            <div className="Operator">
                <div className="text">Operator : </div>
                    <button
                        type="button"
                        className={operator === "+" ? "btnNumber btnStyle2" : "btnNumber btnStyle1"}
                        value = "+"
                        onClick={(e) => handleChoiceOperator(e)}>
                        +
                    </button>
                    <button
                        type="button"
                        className={operator === "-" ? "btnNumber btnStyle2" : "btnNumber btnStyle1"}
                        value = "-"
                        onClick={(e) => handleChoiceOperator(e)}>
                        -
                    </button>
                    <button
                        type="button"
                        value = "*"
                        className={operator === "*" ? "btnNumber btnStyle2" : "btnNumber btnStyle1"}
                        onClick={(e) => handleChoiceOperator(e)}>
                        *
                    </button>
                    <button
                        type="button"
                        value = "/"
                        className={operator === "/" ? "btnNumber btnStyle2" : "btnNumber btnStyle1"}
                        onClick={(e) => handleChoiceOperator(e)}>
                        /
                    </button>
                </div>
            <div className="Range">
                <label htmlFor= "range"> Range : {range}</label>
                <input type="range" id="range" name="range" min ="0" max = "50" step="1" onChange={(e)=> setRange(+(e.target.value))}/>
                
            </div>
            <div className="Length">
                <label htmlFor= "Length">Length : {length}</label>
                <input type="range" id="Length" name="Length" min ="0" max = "100" step="1" onChange={(e)=> setLength(+(e.target.value))}/>
                
                    
            </div>
         </div>
    </>
  );
};

Setting.propTypes = {
    setRange: PropTypes.func,
    range: PropTypes.number,
    setType : PropTypes.func,
    type: PropTypes.number,
    setLength : PropTypes.func,
    length : PropTypes.number,
    setOperator : PropTypes.func,
    operator : PropTypes.string,
}



export default Setting;
