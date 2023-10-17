import LandingNavbar from '../components/LandingNavbar';
import Button from '../components/Button';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <main className={styles['container']}>
        <div className={styles['container__left']}>
          <div className={styles['text-container']}>
            <h1 className={styles['primary-heading']}>
              Where words stand the test of time.
            </h1>
            <p className={styles['text']}>
              A platform where posting your experiences is way more fun. Build
              with React, MongoDB, Express and Node!
            </p>
            <div className={styles['btn-container']}>
              <Button varient="primary">Get Started</Button>
              <Button varient="tertiary"> Register</Button>
            </div>
          </div>
        </div>
        <div className={styles['container__right']}>
          <img
            className={styles['landing-img']}
            src="/landing.svg"
            alt="landing-img"
          />
        </div>
      </main>
    </>
  );
};

export default LandingPage;
