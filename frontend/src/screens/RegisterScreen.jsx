import { useState } from "react";
import styles from "../styles/RegisterScreen.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { set } from "mongoose";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("submit");
  };

  return (
    <div className={styles["parent"]}>
      <div></div>
      <div className={styles["register-container"]}>
        <div className={styles["register-form"]}>
          <h2 className={styles["secondary-heading"]}>Register</h2>
          <p className={styles["text"]}>Sign up for free today!</p>
          <form onSubmit={submitHandler}>
            <FormInput
              placeholder="Username"
              className="mb-2"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <FormInput
              placeholder="Name"
              className="mb-2"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <FormInput
              placeholder="Email Address"
              className="mb-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <FormInput
              type="password"
              placeholder="Password"
              className="mb-2"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <FormInput
              type="password"
              placeholder="Confirm Password"
              className="mb-5"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <Button varient="tertiary" className="mb-2">
              Register
            </Button>
            <p className={styles["text"]}>
              -----------------------or-----------------------
            </p>
            <Button varient="primary" className="mb-2">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
