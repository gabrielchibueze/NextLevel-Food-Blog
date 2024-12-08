"use client";
import { useState } from "react";
import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";
import FullImagePreview from "../imageComponents/fullImagePreview";

export default function MealsGrid({ meals }) {
  const [showImage, setShowImage] = useState(false);
  const [imageSource, setImageSource] = useState("");

  function showImagePreview(image) {
    setShowImage((prevValue) => !prevValue);
    setImageSource((prevValue) => {
      return image;
    });
  }

  return (
    <div>
      {showImage && (
        <FullImagePreview
          imageSource={imageSource}
          showImagePreview={showImagePreview}
        />
      )}
      <ul className={classes.meals}>
        {meals.map((meal) => {
          return (
            <li key={meal.id}>
              <MealItem {...meal} showImagePreview={showImagePreview} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
