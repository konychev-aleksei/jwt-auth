import style from "./select.module.scss";

export default ({ options = [], ...rest }) => (
  <select {...rest} className={style.select}>
    {options.map(({ id, title }) => (
      <option key={id} value={id}>
        {title}
      </option>
    ))}
  </select>
);
