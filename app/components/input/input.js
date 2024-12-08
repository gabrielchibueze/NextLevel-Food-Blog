import classes from "./input.module.css";

export default function InputComponent({
  id,
  name,
  label,
  type,
  control,
  rows,
  onChange,
  value,
  onBlur,
  valid,
  touched,
  required,
}) {
  return (
    <div className={classes.inputcomponent}>
      {control === "textarea" && (
        <div className={`${classes.inputarea} ${classes.input}`}>
          <label htmlFor={id}>{label}</label>
          <textarea
            className={[
              valid ? classes.valid : classes.invalid,
              touched ? classes.touched : classes.untouched,
            ].join(" ")}
            required={required}
            name={name}
            rows={rows}
            placeholder=""
            id={id}
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
            onBlur={() => onBlur(id)}
          />
        </div>
      )}
      {control === "normal" && (
        <div className={[`${classes.inputnormal} ${classes.input}`].join()}>
          <label htmlFor={id}>{label}</label>
          <input
            className={[
              valid ? classes.valid : classes.invalid,
              touched ? classes.touched : classes.untouched,
            ].join(" ")}
            required={required}
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
            onBlur={() => onBlur(id)}
          />
        </div>
      )}
    </div>
  );
}
