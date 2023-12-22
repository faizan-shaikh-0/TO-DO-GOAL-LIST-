import React, { useState } from "react";
import styles from "./GoalInputs.module.css";
const GoalInputs = (props) => {
  const [isValid,setisvalid]=useState(true)
  const [enteredValue, setEnteredValue] = useState("");
  const inputValueHandler = (event) => {
    if(event.target.value.trim().length>0){
        setisvalid(true);
    }
    setEnteredValue(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if(enteredValue.trim().length===0){
         setisvalid(false);
         return;
    }
    props.onAdd(enteredValue);
    setEnteredValue("");
  };
 

  return (
    <div>
      <form onSubmit={submitHandler} className={`${styles["form-control"]} ${!isValid && styles.invalid}`}>
        <label>New Goal!</label>
        <input
          type="text"
          value={enteredValue}
          onChange={inputValueHandler}

        ></input>
        <button className={`${styles["button"]}`}value={enteredValue}>Add Goal</button>
      </form>
    </div>
  );
};
export default GoalInputs;
