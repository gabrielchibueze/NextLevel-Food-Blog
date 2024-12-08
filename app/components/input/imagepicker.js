"use client";
import Image from "next/image";
import classes from "./imagepicker.module.css";
import inputClasses from "./input.module.css";
import { useRef } from "react";
export default function ImagePicker({
  label,
  id,
  name,
  valid,
  touched,
  onChange,
  onBlur,
  required,
  value,
  imagePreview,
  imagePreview2,
}) {
  const imageRef = useRef();
  const handleSelectImage = () => {
    imageRef.current.click();
  };

  return (
    <div className={classes.imagepicker}>
      <label htmlFor={id}>{label}</label>
      <div className={classes.pickfile}>
        <input
          className={[
            classes.input,
            valid ? classes.valid : classes.invalid,
            touched ? classes.touched : classes.untouched,
          ].join(" ")}
          type="file"
          multiple
          accept="image/png, image/jpg, image/jpeg"
          required={required}
          name={name}
          id={id}
          // value={value}
          onChange={(e) => onChange(id, e.target.value, e.target.files)}
          onBlur={onBlur}
          ref={imageRef}
        />
        <button type="button" onClick={handleSelectImage}>
          Pick an Image
        </button>
        {imagePreview && (
          <div>
            <Image
              src={imagePreview}
              width={150}
              alt="Image preview display"
              height={100}
            />
            {imagePreview2 && (
              <Image
                src={imagePreview2}
                width={150}
                alt="Image preview display"
                height={100}
              />
            )}
            <p style={{ fontSize: "0.5rem", fontStyle: "italic" }}>
              Food image preview
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
