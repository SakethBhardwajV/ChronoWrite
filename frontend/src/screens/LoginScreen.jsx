import { useEffect, useInsertionEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginScreen.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      return;
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        username,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
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
              placeholder="Username"
              className="mb-2"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <FormInput
              type="password"
              placeholder="Password"
              className="mb-5"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button type="submit" varient="primary" className="mb-2">
              Login
            </Button>
            <p className={styles["text"]}>
              -----------------------or-----------------------
            </p>
            <Button
              type="button"
              varient="tertiary"
              className="mb-2"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
