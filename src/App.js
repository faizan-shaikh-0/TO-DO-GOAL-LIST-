import styles from "./App.module.css";
import GoalInputs from "./GoalInputs/GoalInputs.js";
import { useState, useEffect } from "react";
import "./GoalList/GoalList.js";
import GoalList from "./GoalList/GoalList.js";
function App() {
  const [goalList, setGoalList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [upadatedData, setUpdatedData] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setIsloading(true);
      setUpdatedData(false);
      try {
        const response = await fetch(
          "https://my-react-goal-project-default-rtdb.firebaseio.com/goals.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        const loadedData = [];
        for (const key in data) {
          loadedData.push({
            id: key,
            text: data[key].text,
            complete: data[key].complete,
          });
        }
        setGoalList(loadedData);
        setIsloading(false);
      } catch (error) {
        console.log("failed to fetch");
      }
    };
    getData();
  }, [upadatedData]);

  const addGoalHandler = async (enteredText) => {
    // setGoalList((prevGoals) => {
    //   const updatedGoals = [...prevGoals];
    //   updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
    //   return updatedGoals;
    // });
    const data = {
      text: enteredText,
      id: Math.random().toString(),
      complete: false,
    };
    setIsloading(true)
    fetch(
      "https://my-react-goal-project-default-rtdb.firebaseio.com/goals.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application / JSON" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Step 2: Handle the response
      });
    setUpdatedData(true);
    setIsloading(false);
  };
  const deleteItemHandler = (goalId) => {
    // setGoalList((prevGoals) => {
    //   const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
    //   console.log("goalId" + goalId);
    //   return updatedGoals;
      
    // });
    setIsloading(true)
    fetch(
      `https://my-react-goal-project-default-rtdb.firebaseio.com/goals/${goalId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body:goalId
      }
    ).then(response=>{
      if(response.ok){
        console.log("these item delted")
        setUpdatedData(true);
        setIsloading(false)
      }
      else{
        console.log("failed to delte")
      }
    })

  };
  const completeHandler = (goalId,completeValue) => {
    console.log(" complete\t" + goalId);
      fetch(
      `https://my-react-goal-project-default-rtdb.firebaseio.com/goals/${goalId}/complete.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeValue),
      }
    ).then(response=>response.json).then(data=>console.log(data))
    setUpdatedData(true);
  };
  let goalListData = (
    <p style={{ textAlign: "center" }}>No goals found. Maybe add one?</p>
  );
  if (isLoading) {
    goalListData = (
      <div className={styles.loading}>
        <i>
          loading...
          <br />
          please wait a moment.
        </i>
      </div>
    );
  }
  if (goalList.length > 0) {
    goalListData = (
      <GoalList
        items={goalList}
        deleteItem={deleteItemHandler}
        completeItem={completeHandler}
      ></GoalList>
    );
  }

  return (
    <div>
      <section id={`${styles["goal-form"]}`}>
        <h1>Today's Goals</h1>
        <GoalInputs onAdd={addGoalHandler}></GoalInputs>
      </section>
      <section id="GoalList">{goalListData}</section>
    </div>
  );
}

export default App;
