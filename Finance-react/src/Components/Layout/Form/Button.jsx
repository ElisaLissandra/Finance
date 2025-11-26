import PropTypes from "prop-types";
import styles from "./Button.module.css";


Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: "button",
};


export default function Button({ type, text }) {
  return (
    <button type={type} className={styles.form_button}>{text}</button>
  );
}

