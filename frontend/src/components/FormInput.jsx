import propTypes from 'prop-types';
import styles from '../styles/FormInput.module.css';

const FormInput = ({
  type = 'text',
  placeholder = 'bruh',
  value,
  onChange,
  className,
  block,
}) => {
  return (
    <input
      className={
        `${styles['input']} ${block && styles['input--block']} ` + className
      }
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
  className: propTypes.any,
  block: propTypes.any,
};

export default FormInput;
