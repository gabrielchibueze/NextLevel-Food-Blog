"use client";
import Image from "next/image";
import burger from "@/assets/burger.jpg";
import curry from "@/assets/curry.jpg";
import dumplings from "@/assets/dumplings.jpg";
import macncheese from "@/assets/macncheese.jpg";
import pizza from "@/assets/pizza.jpg";
import schnitzel from "@/assets/schnitzel.jpg";
import tomatosalad from "@/assets/tomato-salad.jpg";
import { useEffect, useState } from "react";
import classes from "./imageSlideShow.module.css";

export default function ImageSlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const foodImages = [
    {
      image: burger,
      alt: "burger image",
    },
    {
      image: curry,
      alt: "curry image",
    },
    {
      image: dumplings,
      alt: "dumplings image",
    },
    {
      image: macncheese,
      alt: "macncheese image",
    },
    {
      image: pizza,
      alt: "pizza image",
    },
    {
      image: schnitzel,
      alt: "schnitzel image",
    },
    {
      image: tomatosalad,
      alt: "tomatosalad image",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        currentIndex < foodImages.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, foodImages.length]);

  return (
    <div className={classes.slideshow}>
      {foodImages.map((image, index) => {
        return (
          <Image
            key={image.alt}
            src={image.image}
            alt={image.alt}
            className={index === currentIndex ? classes.active : ""}
          />
        );
      })}
    </div>
  );
}
