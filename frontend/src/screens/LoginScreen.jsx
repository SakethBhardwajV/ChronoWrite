import { useEffect, useState } from "react";
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
      navigate(`/home`);
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        username,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/home");
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className={styles["parent"]}>
      <div className={styles["image-container"]}>
        <div className={styles["logo"]}>
          <svg
            width="93"
            height="111"
            viewBox="0 0 93 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.8714 111V38.0278L92.9999 12.3333V85.3056L35.8714 111Z"
              fill="url(#paint0_linear_1_62)"
            />
            <path
              d="M0 98.6667V25.6944L57.1286 0V72.9722L0 98.6667Z"
              fill="url(#paint1_linear_1_62)"
            />
            <path
              d="M57.1286 28.467V72.9722L35.8713 82.533L35.8714 38.0278L57.1286 28.467Z"
              fill="url(#paint2_linear_1_62)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_62"
                x1="93"
                y1="27.75"
                x2="33.2269"
                y2="87.5536"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5C33D4" />
                <stop offset="1" stopColor="#EC61FF" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1_62"
                x1="93"
                y1="27.75"
                x2="33.2269"
                y2="87.5536"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5C33D4" />
                <stop offset="1" stopColor="#904BFF" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_1_62"
                x1="57"
                y1="28"
                x2="46.8192"
                y2="89.6978"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#904BFF" />
                <stop offset="1" stopColor="#5C33D4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
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
            <div className={styles["divider-container"]}>
              <div className={styles["divider"]}></div>
              <span className={styles["span-text"]}>OR</span>
              <div className={styles["divider"]}></div>
            </div>
            <Button
              type="button"
              varient="tertiary"
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
