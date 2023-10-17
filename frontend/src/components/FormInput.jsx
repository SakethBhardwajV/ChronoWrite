import propTypes from 'prop-types';
import styles from '../styles/FormInput.module.css';

const FormInput = ({ type = 'text', placeholder, value, onChange }) => {
  return (
    <input
      className={`${styles['input']}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

FormInput.propTypes = {
  type: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.any,
  onChange: propTypes.func,
};

export default FormInput;
