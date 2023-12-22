import style from "./GoalItems.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { useState } from "react";

const GoalItems = (props) => {
  const [isComplete, setIsComplete] = useState(props.completeValue);

  const deleteHandler = () => {
    props.delete(props.id);
  };
  const completeHandler = () => {
    setIsComplete(!isComplete);
    console.log(isComplete)
    
  };
  return (
    <li className={`${style.list} ${isComplete ? style.complete : ""}`}>
      {props.text}
      {props.children}
      <span>
        <FaTrashAlt onClick={deleteHandler} />
      </span>
      <span>
        <GrCompliance onClick={completeHandler} />
      </span>
    </li>
  );
};
export default GoalItems;
