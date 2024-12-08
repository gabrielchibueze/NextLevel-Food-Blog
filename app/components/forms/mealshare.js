"use client";
import { useState } from "react";
import { isEmail, isRequired, length } from "../utils/validators";
import { generateBase64 } from "../utils/generatebase64";
import InputComponent from "../input/input";
import CtaButton from "../buttons/ctabuttonlink";
import ImagePicker from "../input/imagepicker";
import classes from "./mealshare.module.css";

export default function ShareMealForm({ params }) {
  const Meal_Form = {
    name: {
      value: "",
      touched: false,
      valid: false,
      validators: [length({ min: 2 }), isRequired],
    },
    email: {
      value: "",
      touched: false,
      valid: false,
      validators: [isEmail, isRequired],
    },
    title: {
      value: "",
      touched: false,
      valid: false,
      validators: [isRequired, length({ min: 2 })],
    },
    summary: {
      value: "",
      touched: false,
      valid: false,
      validators: [isRequired, length({ min: 5 })],
    },
    instructions: {
      value: "",
      touched: false,
      valid: false,
      validators: [isRequired, length({ min: 10 })],
    },
    image: {
      value: "",
      touched: false,
      valid: false,
      validators: [isRequired],
    },
  };
  const [currentState, setCurrentState] = useState({
    mealForm: Meal_Form,
    imagePreview: null,
    imagePreview2: null,
    isFormValid: false,
  });

  const inputChangeHandler = (id, value, files) => {
    // Check if an image file has been selected. if yes, pass in a base64 generated image function to display the image in the user screen
    if (files && files[0]) {
      generateBase64(files[0])
        .then((Base64) => {
          setCurrentState((prevState) => {
            return { ...prevState, imagePreview: Base64 };
          });
        })
        .catch((err) => {
          setCurrentState((prevState) => {
            return { ...prevState, imagePreview: null };
          });
        });
    }
    if (files && files[1]) {
      generateBase64(files[1])
        .then((Base64) => {
          setCurrentState((prevState) => {
            return { ...prevState, imagePreview2: Base64 };
          });
        })
        .catch((err) => {
          setCurrentState((prevState) => {
            return { ...prevState, imagePreview2: null };
          });
        });
    }
    // Set the corresponding values of the input to the form
    setCurrentState((prevState) => {
      let isValid = true;
      for (let validator of prevState.mealForm[id].validators) {
        isValid = isValid && validator(value);
      }
      // 1 use the validators in the inputs to check for validity
      // 2 check if the input is valid by mapping through them

      const updatedForm = {
        ...prevState.mealForm,
        [id]: {
          value: files ? files[0] : value,
          touched: true,
          valid: isValid,
          validators: prevState.mealForm[id].validators,
        },
        // 3 after checking if the inputs are valid, determin the overall form validity by checking if all the inputs are valid
      };
      let formValid = true;
      for (let inputName in updatedForm) {
        formValid = formValid && updatedForm[inputName].valid === true;
      }
      return {
        ...prevState,
        mealForm: updatedForm,
        isFormValid: formValid,
      };
    });
  };

  const inputBlurHandler = (id) => {
    // check if an input element has been touched. if yes, set it to be true
    setCurrentState((prevState) => {
      const currentInputForm = {
        ...prevState.mealForm,
        [id]: {
          ...prevState.mealForm[id],
          touched: true,
        },
      };
      return {
        ...prevState,
        mealForm: currentInputForm,
      };
    });
  };
  return (
    <div className={classes.formsection}>
      <div className={classes.form}>
        <div className={classes.upperformsection}>
          <div style={{ width: "50%" }}>
            <InputComponent
              control="normal"
              type="text"
              id="name"
              name="name"
              label="Your name"
              value={currentState.mealForm.name?.value}
              valid={currentState.mealForm.name?.valid}
              touched={currentState.mealForm.name?.touched}
              onChange={inputChangeHandler}
              onBlur={() => inputBlurHandler("name")}
            />
          </div>
          <div style={{ width: "48%" }}>
            <InputComponent
              required={true}
              control="normal"
              type="text"
              id="email"
              name="email"
              label="Your email"
              value={currentState.mealForm.email?.value}
              valid={currentState.mealForm.email?.valid}
              touched={currentState.mealForm.email?.touched}
              onChange={inputChangeHandler}
              onBlur={() => inputBlurHandler("email")}
            />
          </div>
        </div>
        <InputComponent
          required={true}
          control="normal"
          type="text"
          id="title"
          name="title"
          label="name of food "
          value={currentState.mealForm.title?.value}
          valid={currentState.mealForm.title?.valid}
          touched={currentState.mealForm.title?.touched}
          onChange={inputChangeHandler}
          onBlur={() => inputBlurHandler("title")}
        />
        <InputComponent
          required={true}
          control="textarea"
          type="text"
          id="summary"
          name="summary"
          label="summary"
          rows={2}
          value={currentState.mealForm.summary?.value}
          valid={currentState.mealForm.summary?.valid}
          touched={currentState.mealForm.summary?.touched}
          onChange={inputChangeHandler}
          onBlur={() => inputBlurHandler("summary")}
        />
        <InputComponent
          required={true}
          control="textarea"
          type="text"
          rows={6}
          id="instructions"
          name="instructions"
          label="instructions"
          value={currentState.mealForm.instructions?.value}
          valid={currentState.mealForm.instructions?.valid}
          touched={currentState.mealForm.instructions?.touched}
          onChange={inputChangeHandler}
          onBlur={() => inputBlurHandler("instructions")}
        />
        <ImagePicker
          required={true}
          name="image"
          id="image"
          label="choose food image"
          // value={currentState.mealForm.image?.value}
          valid={currentState.mealForm.image?.valid}
          touched={currentState.mealForm.image?.touched}
          onChange={inputChangeHandler}
          onBlur={() => inputBlurHandler("image")}
          imagePreview={currentState.imagePreview}
          imagePreview2={currentState.imagePreview2}
        />
        <div className={classes.submitmeal}>
          <CtaButton
            type="button"
            // action={submitMealForm}
            design="accent"
            loading="Loading..."
            disabled={!currentState.isFormValid}
          >
            Submit
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
