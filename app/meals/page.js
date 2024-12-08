import CtaButton from "../components/buttons/ctabuttonlink";
import classes from "./page.module.css";
import MealsGrid from "../components/meals/meals-grid";
import { Suspense } from "react";
import { getMeals } from "@/lib/meals";
import FullImagePreview from "../components/imageComponents/fullImagePreview";

// async function FetchMeals() {
//     await new Promise((resolve) => setTimeout(resolve, 3000))
//     const res = await fetch("http://localhost:3000/api/meals")
//     const data = await res.json()
//     // throw new Error("An error occured fetching meals. Try again")
//     return <MealsGrid meals={data} />
// }
export async function metadata() {
  return {
    title: "Browse Meals",
    description:
      "Browse a collection of good meals from the NextLevel Food community",
  };
}
async function FetchMeals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
export const metedata = {
  title: "All Meals",
  description: "Browse all the meals in our NextLevel foodies community",
};

export default async function MealsPage() {
  return (
    <div className={classes.mealsections}>
      <header className={classes.header}>
        <h1>
          Delicious meals created <span className={classes.extras}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun
        </p>
        <CtaButton
          type="link"
          action="/share"
          loading="Please wait..."
          design="accent"
        >
          Share your favorite Recipe
        </CtaButton>
      </header>
      <main>
        <Suspense
          fallback={<p className={classes.loading}>Fetching Meals...</p>}
        >
          {/* <FullImagePreview imageSource={imageSource} /> */}
          <FetchMeals />
        </Suspense>
      </main>
    </div>
  );
}
