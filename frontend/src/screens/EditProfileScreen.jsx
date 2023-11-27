import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EditProfileScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
  useUpdateAvatarMutation,
  useDeleteAccountMutation,
} from "../slices/userApiSlice";
import { updateStorage, logout } from "../slices/authSlice";
import { toast } from "react-toastify";

const EditProfileScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: user, refetch, isLoading, error } = useGetUserDetailsQuery();

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const [uploadAvatar, { isLoading: loadingUpload }] =
    useUploadAvatarMutation();

  const [updateAvatar, { isLoading: loadingUpdateAvatar }] =
    useUpdateAvatarMutation();

  const [deleteAccount, { isLoading: loadingDeleteAccount }] =
    useDeleteAccountMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await updateUser({
        name,
        username,
        password,
      }).unwrap();
      dispatch(updateStorage(res));
      refetch();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadAvatar(formData).unwrap();
      setAvatar(res.image);
      const avatarImage = await updateAvatar({ avatar: res.image }).unwrap();
      dispatch(updateStorage({ ...userInfo, avatar: avatarImage.avatar }));
      toast.success("Avatar updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const newDiceBearAvatar = () => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomString}`;
  };

  const generateRandomAvatar = async (e) => {
    e.preventDefault();
    try {
      const randomAvatar = newDiceBearAvatar();
      setAvatar(randomAvatar);
      const avatarImage = await updateAvatar({ avatar: randomAvatar }).unwrap();
      dispatch(updateStorage({ ...userInfo, avatar: avatarImage.avatar }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteAccountHandler = async (e) => {
    e.preventDefault();
    try {
      await deleteAccount().unwrap();
      dispatch(logout());
      navigate("/");
      toast.success("Account deleted");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar settings />
        <div className={styles["main"]}>
          <h1 className={styles["main__title"]}>Edit Profile</h1>
          <div className={styles["form__container"]}>
            <div className={styles["form__container__left"]}>
              <form className={styles["form"]} onSubmit={submitHandler}>
                <div className={styles["form__field"]}>
                  <label htmlFor="username" className={styles["form__label"]}>
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className={styles["form__input"]}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={styles["form__field"]}>
                  <label htmlFor="email" className={styles["form__label"]}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={styles["form__input"]}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
                <div className={styles["form__field"]}>
                  <label htmlFor="name" className={styles["form__label"]}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={styles["form__input"]}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles["form__field"]}>
                  <label htmlFor="password" className={styles["form__label"]}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={styles["form__input"]}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {password && (
                  <div className={styles["form__field"]}>
                    <label
                      htmlFor="confirmPassword"
                      className={styles["form__label"]}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className={styles["form__input"]}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
                <div className={styles["form__field"]}>
                  <button
                    type="submit"
                    className={`${styles["form__button"]} ${styles["form__button--update"]}`}
                  >
                    Update
                  </button>
                </div>
              </form>
              <button
                className={`${styles["form__button"]} ${styles["form__button--delete"]}`}
                onClick={deleteAccountHandler}
              >
                Delete Account
              </button>
              <button
                className={`${styles["form__button"]} ${styles["form__button--cancel"]}`}
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
            <div className={styles["form__container__right"]}>
              <img
                src={avatar}
                alt="profile"
                className={styles["form__image"]}
              />
              <input
                type="file"
                id="inputImage"
                style={{ display: "none" }}
                accept="image/*"
                onChange={uploadHandler}
              />
              <label htmlFor="inputImage" style={{ width: "100%" }}>
                <div
                  className={`${styles["form__button"]} ${styles["form__button--change"]}`}
                >
                  Change Photo
                </div>
              </label>
              <button
                className={`${styles["form__button"]} ${styles["form__button--remove"]}`}
                onClick={generateRandomAvatar}
              >
                Remove Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileScreen;
