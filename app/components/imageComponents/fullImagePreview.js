import Image from "next/image";
import classes from "./fullImagePreview.module.css";
export default function FullImagePreview({ imageSource, showImagePreview }) {
  return (
    <div className={classes.imagePreview}>
      <div>
        <p
          className={classes.closeModal}
          style={{ cursor: "pointer" }}
          onClick={() => showImagePreview("")}
        >
          X
        </p>
      </div>
      <div className={classes.imageShown}>
        <Image src={imageSource} fill />
      </div>
    </div>
  );
}
