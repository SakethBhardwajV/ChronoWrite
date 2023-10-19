import PropTypes from "prop-types";
import styles from "../styles/Button.module.css";

const Button = ({
  varient = "",
  onClick,
  children = "Enter Text",
  style,
  className,
  type = "",
}) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={
        ` ${styles["btn"]} ${type === "block" ? styles["btn--block"] : ""} ${
          varient === "primary"
            ? styles["btn--primary"]
            : varient === "secondary"
            ? styles["btn--secondary"]
            : varient === "tertiary"
            ? styles["btn--tertiary"]
            : ""
        } ` + className
      }
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  varient: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.any,
  type: PropTypes.string,
};

export default Button;
