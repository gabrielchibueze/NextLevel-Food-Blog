"use client";
import Image from "next/image";
import classes from "./meal-details.module.css";
import CtaButton from "../buttons/ctabuttonlink";
import { BiMessageDots } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";
import { notFound } from "next/navigation";
// import slugify from "slugify";

export default function MealDetailsPage({
  title,
  image,
  creator,
  summary,
  instructions,
  creator_email,
  key,
}) {
  const [isShowLink, setIsShowLink] = useState(false);
  if (!title) {
    notFound();
  }
  const SegmentedInstructions = (info) => {
    const text = info.split(".");
    let newText = [];
    for (let i = 0; i < text.length; i++) {
      const instructionLength = text[i].split()[0].trim().length;
      if (instructionLength > 1) {
        newText.push(text[i]);
      }
    }
    return (
      <ol className={classes.instructions}>
        {newText.length > 0 &&
          newText.map((txt) => (
            <li key={txt}>
              <p>{txt}.</p>
            </li>
          ))}
      </ol>
    );
  };

  //   instructions = instructions.replace(/\n/g, "<br />");
  function showUserLink() {
    setIsShowLink(!isShowLink);
  }
  return (
    <article className={classes.meal} key={key}>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://nextlevel-foods-foodies-page-by-gabriel-egwu-via-nextjs.s3.eu-north-1.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <div
            className={classes.viewusersection}
            onclick={showUserLink}
            onMouseEnter={showUserLink}
            onMouseLeave={showUserLink}
          >
            <a>
              <p>by {creator}</p>
              <BiMessageDots />
            </a>
            {isShowLink && (
              <div className={classes.userLinks} onclick={showUserLink}>
                <a href={`mailto:${creator_email}`}>
                  {<MdOutlineMail />}
                  <p>Send Email</p>
                </a>
                <a href={`/user/${creator.userid}`}>
                  {<FaUser />}
                  <p>View profile</p>
                </a>
              </div>
            )}
          </div>
          <div className={`${classes.content} ${classes.desktop}`}>
            <p className={classes.summary}>{summary}</p>
            <div className={classes.addtofavorite}>
              <CtaButton
                type="button"
                design="accent"
                action="/meals/favorites"
              >
                + Add to Favorites
              </CtaButton>
            </div>
          </div>
        </div>
      </header>
      <div className={`${classes.content} ${classes.mobile}`}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.addtofavorite}>
          <CtaButton type="button" design="accent" action="/meals/favorites">
            + Add to Favorites
          </CtaButton>
        </div>
      </div>
      <main className={classes.cookinginstructions}>
        <h2>Cooking Instructions</h2>
        <hr />
        {/* <p dangerouslySetInnerHTML={{ __html: instructions }}></p> */}
        {SegmentedInstructions(instructions)}
      </main>
      <div className={classes.share}>
        <CtaButton type="link" design="accent" action="/meals/share">
          Share Meal
        </CtaButton>
      </div>
    </article>
  );
}
