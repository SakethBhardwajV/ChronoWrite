import { useState } from "react";
import styles from "../styles/LoginScreen.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className={styles["parent"]}>
      <div></div>
      <div className={styles["login-container"]}>
        <div className={styles["login-form"]}>
          <h2 className={styles["secondary-heading"]}>Login</h2>
          <p className={styles["text"]}>Get back to writing more blogs!</p>
          <form onSubmit={submitHandler}>
            <FormInput
              placeholder="Email Address"
              className="mb-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <FormInput
              type="password"
              placeholder="Password"
              className="mb-5"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button varient="primary" className="mb-2">
              Login
            </Button>
            <p className={styles["text"]}>
              -----------------------or-----------------------
            </p>
            <Button varient="tertiary" className="mb-2">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
