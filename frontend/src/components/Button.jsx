import PropTypes from 'prop-types';
import styles from '../styles/Button.module.css';

const Button = ({ varient, onClick, children = 'Enter Text' }) => {
  return (
    <button
      onClick={onClick}
      className={` ${styles['btn']} ${
        varient === 'primary'
          ? styles['btn--primary']
          : varient === 'secondary'
          ? styles['btn--secondary']
          : varient === 'tertiary'
          ? styles['btn--tertiary']
          : ''
      } `}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  varient: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

export default Button;
