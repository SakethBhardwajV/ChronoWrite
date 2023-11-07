import React from "react";
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["loader"]}>
        <div className={`${styles["loader__circle"]} ${styles["a"]}`}></div>
        <div className={`${styles["loader__circle"]} ${styles["b"]}`}></div>
        <div className={`${styles["loader__circle"]} ${styles["c"]}`}></div>
      </div>
    </div>
  );
};

export default Loader;
