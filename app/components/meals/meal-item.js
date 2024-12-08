"use client";
import Link from "next/link";
import Image from "next/image";
import classes from "./meal-item.module.css";
import CtaButton from "../buttons/ctabuttonlink";
import { useState } from "react";
import FullImagePreview from "../imageComponents/fullImagePreview";

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
  showImagePreview,
}) {
  // const [showImage, setShowImage] = useState(false);

  const imageSource = `https://nextlevel-foods-foodies-page-by-gabriel-egwu-via-nextjs.s3.eu-north-1.amazonaws.com/${image}`;

  // function showImagePreview() {
  //   setShowImage((prevValue) => !prevValue);
  // }
  return (
    <div>
      <article className={classes.meal}>
        <header>
          <div className={classes.image}>
            <Image
              onClick={() => showImagePreview(imageSource)}
              src={imageSource}
              alt={title}
              fill
            />
          </div>
          <div className={classes.headerText}>
            <h2>{title}</h2>
            <p>by {creator}</p>
          </div>
        </header>
        <div className={classes.content}>
          <p className={classes.summary}>{summary}</p>
          <div className={classes.actionsbtn}>
            <CtaButton type="link" action={`/meals/${slug}`} design="accent">
              View Details
            </CtaButton>
          </div>
        </div>
      </article>
    </div>
  );
}
