import { useState, useEffect } from "react";
import styles from "../styles/RegisterScreen.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/userApiSlice";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading, error }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      return;
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await register({
        username,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      // navigate("/home");
      return;
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
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
              pattern="/^[_a-zA-Z0-9][a-zA-Z0-9._]{4,15}$/"
            />
            <FormInput
              placeholder="Name"
              className="mb-2"
              onChange={(e) => setName(e.target.value)}
              value={name}
              pattern={"/^[A-Za-zs]{3,}$/"}
            />
            <FormInput
              type="email"
              placeholder="Email Address"
              className="mb-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              pattern="/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/"
            />
            <FormInput
              type="password"
              placeholder="Password"
              className="mb-2"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              pattern={`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>.?/|])[A-Za-z\d!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>.?/|]{8,}$/`}
            />
            <FormInput
              type="password"
              placeholder="Confirm Password"
              className="mb-5"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <Button type="submit" varient="tertiary" className="mb-2">
              Register
            </Button>
            <p className={styles["text"]}>
              -----------------------or-----------------------
            </p>
            <Button
              type="button"
              varient="primary"
              className="mb-2"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
