import PropTypes from 'prop-types';

import styles from '../styles/LandingNavbar.module.css';

const LandingNavbar = ({ about, support }) => {
  return (
    <ul className={styles['nav']}>
      <a href="/">
        <img
          className={styles['nav__logo']}
          src="/logo-with-text.svg"
          alt="logo"
        />
      </a>

      <li className={styles['nav__group']}>
        <a
          className={`${styles['nav__item']} ${
            about && styles['nav__item--active']
          }`}
          href="/about"
        >
          about
        </a>
        <a
          className={`${styles['nav__item']} ${
            support && styles['nav__item--active']
          }`}
          href="/support"
        >
          support
        </a>
        <a className={styles['nav__item']} href="/dashboard">
          login
        </a>
      </li>

      <input
        className={styles['nav__checkbox']}
        type="checkbox"
        id="nav-toggle"
        defaultChecked={true}
      />

      <label htmlFor="nav-toggle" className={styles['nav__button']}>
        <span className={styles['nav__hamburger']}>&nbsp;</span>
      </label>

      <div className={styles['nav__mobile']}>
        <div className={styles['nav__mobile__group']}>
          <label htmlFor="nav-toggle" className={styles['nav__button--close']}>
            <span
              className={`${styles['nav__close']} ${styles['nav__close--1']}`}
            >
              {' '}
              &nbsp;
            </span>
            <span
              className={`${styles['nav__close']} ${styles['nav__close--2']}`}
            >
              {' '}
              &nbsp;
            </span>
          </label>
        </div>
        <div className={styles['nav__mobile__items']}>
          <a
            className={`${styles['nav__mobile__item']} ${styles['nav__mobile__item--1']}`}
            href="/about"
          >
            about
          </a>
          <a
            className={`${styles['nav__mobile__item']} ${styles['nav__mobile__item--2']}`}
            href="/support"
          >
            support
          </a>
          <a
            className={`${styles['nav__mobile__item']} ${styles['nav__mobile__item--3']}`}
            href="/login"
          >
            login
          </a>
        </div>
      </div>
    </ul>
  );
};

LandingNavbar.propTypes = {
  about: PropTypes.string.isRequired,
  support: PropTypes.string.isRequired,
};

export default LandingNavbar;
