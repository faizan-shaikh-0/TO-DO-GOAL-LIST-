import GoalItems from "../GoalItems/GoalItems";
import "./GoalList.css";
const GoalList = (props) => {
  return (
    <ul className="goal-list">
      {props.items.map((goal) => {
        return (
          <GoalItems
            text={goal.text}
            key={goal.id}
            delete={props.deleteItem}
            id={goal.id}
            completeValue={goal.complete}
            completeItem={props.completeItem}
          />
        );
      })}
    </ul>
  );
};

export default GoalList;
