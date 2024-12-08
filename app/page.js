import Link from "next/link";
import classes from "@/app/page.module.css";
import ImageSlideShow from "@/app/components/imageComponents/imageSlideShow";
import CtaButton from "./components/buttons/ctabuttonlink";
export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.imageslide}>
          {/* Image slide show here */}
          <ImageSlideShow />
        </div>
        <div>
          <div className={classes.title}>
            <h1>NEXTLEVEL FOOD FOR NEXTLEVEL FOODIES</h1>
            <p>Taste & share food from all over the world</p>
          </div>
          <div className={classes.cta}>
            <CtaButton type="link" design="flat" action="/community">
              join the Community
            </CtaButton>
            <CtaButton type="link" design="accent" action="/meals">
              Explore Meals
            </CtaButton>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
