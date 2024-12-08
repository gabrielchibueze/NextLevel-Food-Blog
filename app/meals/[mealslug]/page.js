import MealDetailsPage from "@/app/components/meals/meal-details";
import { getMeal } from "@/lib/meals";
import { Suspense } from "react";
import classes from "./page.module.css";
import slugify from "slugify";
import { notFound } from "next/navigation";

// async function fetchMeal() {
//     const res = await fetch("http://localhost:3000/api/meals")
//     const data = await res.json()
//     return data
// }

export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealslug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}

async function GetSingleMealDetail({ params }) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const meal = await getMeal(params.mealslug);
  return <MealDetailsPage {...meal} key={slugify(meal.title)} />;
}

export default async function Meal({ params }) {
  return (
    <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
      <GetSingleMealDetail params={params} />
    </Suspense>
  );
}
