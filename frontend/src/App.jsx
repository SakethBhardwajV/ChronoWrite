import styles from './styles/App.module.css';

function App() {
  return (
    <>
      <h1 className={`${styles['primary-heading']} ${styles['margin-large']}`}>
        Hello world
      </h1>
    </>
  );
}

export default App;
