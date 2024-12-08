import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";
const s3 = new S3({
  region: "eu-north-1",
});
const db = sql("meals.db");
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return db.prepare("SELECT * FROM meals").all();
}
export async function getMeal(slug) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  // check if the user input is valid
  //create a slug for the title
  meal.slug = slugify(meal.title, { lower: true });
  //   protect the instructions and the summary from cross site scripting attacks
  meal.summary = xss(meal.summary);
  meal.instructions = xss(meal.instructions);

  //   extract the image extension from the image file (e.g: .png)
  const extension = meal.image.name.split(".").pop();
  // add this extension to the slug name of the meal to generate t he file name
  const fileName = `${meal.slug}.${extension}`;
  // save the file to the public folder
  //  1: create a writestream using node:fs system by passing in the generated filename above
  // const stream = fs.createWriteStream(`public/images/${fileName}`);
  // 2: use the created stream to convert the arrayBuffer from the image to normal Buffer
  const bufferedImage = await meal.image.arrayBuffer();
  // Then write the stream
  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) {
  //     throw new Error("An error occured uploading meal. try again");
  //   }
  // });

  s3.putObject({
    Bucket: "nextlevel-foods-foodies-page-by-gabriel-egwu-via-nextjs",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });
  meal.image = fileName;

  // Time to save the meal to the database using the updated meal information and file path to the public folder for the image
  // 1 use the better-sql3 to prepare and save the meal
  db.prepare(
    `
    INSERT INTO meals 
    (title, slug, summary, instructions, image, creator, creator_email)
    
    VALUES (
    @title,
    @slug,
    @summary,
    @instructions,
    @image,
    @creator,
    @creator_email)`
  ).run(meal);
}
