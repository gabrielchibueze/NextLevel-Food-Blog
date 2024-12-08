"use server";

import { saveMeal } from "@/lib/meals";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
function isValidInput(text) {
  // if (!text || text.trim() === "") return false;
  return !text || text.trim() === "";
}
function isEmail(email) {
  if (email.includes("@")) {
    console.log("It does include @");
  } else {
    return false;
  }
}
export const submitMealForm = async (prevState, formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  console.log(meal);
  if (
    isValidInput(meal.creator) ||
    isValidInput(meal.creator_email) ||
    isValidInput(meal.summary) ||
    isValidInput(meal.instructions) ||
    isValidInput(meal.title) ||
    // isEmail(meal.creator_email)
    !meal.creator_email.includes("@")
    // meal.image.size === 0
  ) {
    console.log("THahjlivuvlhhbh");
    // If the user input is invalid, throw an error
    return {
      message: "Invalid input entered. All form spaces must be completed",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals", "layout");
  redirect("/meals");
};
