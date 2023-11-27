import { useState, useEffect } from "react";
import styles from "../styles/RegisterScreen.module.css";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading, error }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const trimmedUsername = username.trim();
    try {
      await register({
        username: trimmedUsername,
        name,
        email,
        password,
      }).unwrap();
      toast.success("User created successfully, please verify your email");
      return;
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
              type="email"
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
            <Button type="submit" varient="tertiary" className="mb-2">
              Register
            </Button>
            <div className={styles["divider-container"]}>
              <div className={styles["divider"]}></div>
              <span className={styles["span-text"]}>OR</span>
              <div className={styles["divider"]}></div>
            </div>
            <Button
              type="button"
              varient="primary"
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
