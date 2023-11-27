import style from "./button.module.scss";

export default ({ children, ...rest }) => (
  <button {...rest} className={style.button}>
    {children}
  </button>
);
