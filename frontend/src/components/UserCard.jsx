import { useNavigate } from "react-router-dom";
import styles from "../styles/UserCard.module.css";

const UserCard = ({ name, username, image }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles["card"]}
        onClick={() => navigate(`/user/${username}`)}
      >
        <div className={styles["card__image"]}>
          <img src={image} alt="profile-img" className={styles["profile"]} />
          <p className={styles["name"]}>{name}</p>
          <p className={styles["username"]}>@{username}</p>
        </div>
        <button className={styles["follow-btn"]}>Follow</button>
      </div>
    </>
  );
};

export default UserCard;
