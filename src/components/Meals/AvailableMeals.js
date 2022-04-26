import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-hhtp2-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something is wong ");
      }
      const responsedata = await response.json();

      const loadedMeals = [];

      for (const key in responsedata) {
        loadedMeals.push({
          id: key,
          name: responsedata[key].name,
          description: responsedata[key].description,
          price: responsedata[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoding(false);
    };
    fetchData().catch((error) => {
      setIsLoding(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoding) {
    return (
      <section className={classes.mealIsLoding}>
        <p>Loding ...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.httpError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
