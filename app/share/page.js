"use client";
import classes from "./page.module.css";
import { submitMealForm } from "./mealserver";
import ShareMealForm from "../components/forms/mealshare";
import { useFormState } from "react-dom";
import { MdTitle } from "react-icons/md";

// export async function metadata() {
//   return {
//     title: "Share Meals",
//     description: "Share meals to showcase to the NextLevel Food Community",
//   };
// }
export default function ShareMeal({ params }) {
  const [state, formAction] = useFormState(submitMealForm, { message: null });
  return (
    <div className={classes.sharemeal}>
      <h1>
        Share your <span className={classes.highlight}>favorite meal</span>
      </h1>
      <p>or any other meal you feel needs sharing</p>
      <div className={classes.formsection}>
        {state.message && <p>{state.message}</p>}
        <form className={classes.form} action={formAction}>
          <ShareMealForm />
        </form>
      </div>
    </div>
  );
}
