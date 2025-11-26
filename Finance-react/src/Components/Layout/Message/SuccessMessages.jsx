import PropTypes from "prop-types";
import styles from "./Message.module.css";


SuccessMessages.propTypes = {
  message: PropTypes.string,
};

export default function SuccessMessages({message}) {
  return (
    <div className={styles.message}  style={{ display: message ? 'block' : 'none' }}>
      <p className={styles.message_success}>
        {message}
      </p>
    </div>
  );
}

