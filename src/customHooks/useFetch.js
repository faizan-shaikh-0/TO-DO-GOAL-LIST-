import { useState,useEffect } from "react";
const useFetch=()=>{
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
  return {
    goalList,
    isLoading,
    upadatedData
  }
}
export default useFetch;