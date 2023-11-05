import styles from "../../styles/UserListScreen.module.css";
import ProfileNavbar from "../../components/ProfileNavBar";

const UserListScreen = () => {
  return (
    <>
      <div className={styles.container}>
        <ProfileNavbar users />
        <main className={styles.main}>
          <h1 className={styles.main__title}>Users</h1>
          <p className={styles.main__subtitle}>All registered users</p>
          <table className={styles.main__table}>
            <thead>
              <tr>
                <th
                  className={`${styles["main__table__head"]} ${styles["main__table__head--username"]}`}
                >
                  Username
                </th>
                <th
                  className={`${styles["main__table__head"]} ${styles["main__table__head--name"]}`}
                >
                  Name
                </th>
                <th
                  className={`${styles["main__table__head"]} ${styles["main__table__head--email"]}`}
                >
                  Email
                </th>
                <th
                  className={`${styles["main__table__head"]} ${styles["main__table__head--member"]}`}
                >
                  Member
                </th>
                <th
                  className={`${styles["main__table__head"]} ${styles["main__table__head--post"]}`}
                >
                  Posts posted
                </th>
                <th
                  className={`${styles["main__table__head"]} ${styles["main__table__head--admin"]}`}
                >
                  Toggle Admin
                </th>
                <th
                  className={`${styles["main__table__head"]} ${styles["main__table__head--delete"]}`}
                ></th>
              </tr>
            </thead>

            <tbody>
              <tr className={styles["main__table__row"]}>
                <td className={styles["main__table__data"]}>username</td>
                <td className={styles["main__table__data"]}>name</td>
                <td className={styles["main__table__data"]}>email@gmail.com</td>
                <td className={styles["main__table__data"]}>x</td>
                <td className={styles["main__table__data"]}>XX</td>
                <td className={styles["main__table__data"]}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.00016 1.3335V10.6668M1.3335 6.00016H10.6668"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </td>
                <td className={styles["main__table__data"]}>
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.66667 4.00016V3.46683C9.66667 2.72009 9.66667 2.34672 9.52134 2.06151C9.39351 1.81063 9.18954 1.60665 8.93865 1.47882C8.65344 1.3335 8.28007 1.3335 7.53333 1.3335H6.46667C5.71993 1.3335 5.34656 1.3335 5.06135 1.47882C4.81046 1.60665 4.60649 1.81063 4.47866 2.06151C4.33333 2.34672 4.33333 2.72009 4.33333 3.46683V4.00016M5.66667 7.66683V11.0002M8.33333 7.66683V11.0002M1 4.00016H13M11.6667 4.00016V11.4668C11.6667 12.5869 11.6667 13.147 11.4487 13.5748C11.2569 13.9511 10.951 14.2571 10.5746 14.4488C10.1468 14.6668 9.58677 14.6668 8.46667 14.6668H5.53333C4.41323 14.6668 3.85318 14.6668 3.42535 14.4488C3.04903 14.2571 2.74307 13.9511 2.55132 13.5748C2.33333 13.147 2.33333 12.5869 2.33333 11.4668V4.00016"
                      stroke="#E43C3C"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default UserListScreen;
