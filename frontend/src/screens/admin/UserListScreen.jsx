import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/UserListScreen.module.css";
import ProfileNavbar from "../../components/ProfileNavBar";
import {
  useGetAllUsersQuery,
  useMakeMemberMutation,
  useMakeUnmemberMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
  useDeleteUserMutation,
} from "../../slices/userApiSlice";

const UserListScreen = () => {
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [isVerified, setIsVerified] = useState(false);

  const { data: users, refetch, isLoading, error } = useGetAllUsersQuery();
  const [makeMember] = useMakeMemberMutation();
  const [makeUnmember] = useMakeUnmemberMutation();
  const [makeAdmin] = useMakeAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleMakeMember = async (id) => {
    try {
      await makeMember(id);
      refetch();
      console.log("Member created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveMember = async (id) => {
    try {
      await makeUnmember(id);
      refetch();
      console.log("Member removed successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleMakeAdmin = async (id) => {
    try {
      await makeAdmin(id);
      refetch();
      console.log("Admin created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      await removeAdmin(id);
      refetch();
      console.log("Admin removed successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      refetch();
      console.log("User deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <ProfileNavbar users />
        <main className={styles.main}>
          <h2 className={styles["main-title"]}>Users</h2>
          <p className={styles["main-text"]}>All registered users</p>
          <div className={styles["table-container"]}>
            <div className={`${styles["table-header"]} ${styles["table-row"]}`}>
              <div
                className={`${styles["table-col"]} ${styles["table-col--username"]}`}
              >
                Username
              </div>
              <div
                className={`${styles["table-col"]} ${styles["table-col--name"]}`}
              >
                Name
              </div>
              <div
                className={`${styles["table-col"]} ${styles["table-col--email"]}`}
              >
                Email
              </div>
              <div
                className={`${styles["table-col"]} ${styles["table-col--verified"]}`}
              >
                Verified
              </div>
              <div
                className={`${styles["table-col"]} ${styles["table-col--posts"]}`}
              >
                Member
              </div>
              <div
                className={`${styles["table-col"]} ${styles["table-col--toggle"]}`}
              >
                Toggle Admin
              </div>

              <div
                className={`${styles["table-col"]} ${styles["table-col--delete"]}`}
              >
                Delete user
              </div>
            </div>
            <div className={`${styles["table-body"]}`}>
              {users?.map((user) => (
                <div
                  key={user._id}
                  className={`${styles["table-item"]} ${styles["table-row"]}`}
                >
                  <div
                    className={`${styles["table-col"]} ${styles["table-col--username"]}`}
                  >
                    <Link
                      to="/userprofile"
                      style={{ textDecoration: "none", color: "currentcolor" }}
                    >
                      {user.username}
                    </Link>
                  </div>
                  <div
                    className={`${styles["table-col"]} ${styles["table-col--name"]}`}
                  >
                    {user.name}
                  </div>
                  <div
                    className={`${styles["table-col"]} ${styles["table-col--email"]}`}
                  >
                    {user.email}
                  </div>
                  <div
                    className={`${styles["table-col"]} ${styles["table-col--verified"]}`}
                  >
                    {!user.isVerified ? (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className={styles["table-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.2998 4.70022L4.70017 11.2999M4.70017 4.70022L11.2998 11.2999"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className={styles["table-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3337 4L6.00033 11.3333L2.66699 8"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className={`${styles["table-col"]} ${styles["table-col--posts"]}`}
                  >
                    {user.isMember ? (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className={styles["table-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleRemoveMember(user._id)}
                      >
                        <path
                          d="M13.3337 4L6.00033 11.3333L2.66699 8"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className={styles["table-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleMakeMember(user._id)}
                      >
                        <path
                          d="M7.99967 3.3335V12.6668M3.33301 8.00016H12.6663"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className={`${styles["table-col"]} ${styles["table-col--toggle"]}`}
                  >
                    {user.isAdmin ? (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className={styles["table-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleRemoveAdmin(user._id)}
                      >
                        <path
                          d="M13.3337 4L6.00033 11.3333L2.66699 8"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className={styles["table-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleMakeAdmin(user._id)}
                      >
                        <path
                          d="M7.99967 3.3335V12.6668M3.33301 8.00016H12.6663"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  <div
                    className={`${styles["table-col"]} ${styles["table-col--delete"]}`}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <svg
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles["table-icon"]}
                    >
                      <path
                        d="M9.66667 4.00016V3.46683C9.66667 2.72009 9.66667 2.34672 9.52134 2.06151C9.39351 1.81063 9.18954 1.60665 8.93865 1.47882C8.65344 1.3335 8.28007 1.3335 7.53333 1.3335H6.46667C5.71993 1.3335 5.34656 1.3335 5.06135 1.47882C4.81046 1.60665 4.60649 1.81063 4.47866 2.06151C4.33333 2.34672 4.33333 2.72009 4.33333 3.46683V4.00016M5.66667 7.66683V11.0002M8.33333 7.66683V11.0002M1 4.00016H13M11.6667 4.00016V11.4668C11.6667 12.5869 11.6667 13.147 11.4487 13.5748C11.2569 13.9511 10.951 14.2571 10.5746 14.4488C10.1468 14.6668 9.58677 14.6668 8.46667 14.6668H5.53333C4.41323 14.6668 3.85318 14.6668 3.42535 14.4488C3.04903 14.2571 2.74307 13.9511 2.55132 13.5748C2.33333 13.147 2.33333 12.5869 2.33333 11.4668V4.00016"
                        stroke="#E43C3C"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
``;
export default UserListScreen;
