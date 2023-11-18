import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SearchScreen.module.css";
import SideNavbar from "../components/SideNavbar";
import UserCard from "../components/UserCard";
import { useGetSearchUsersQuery } from "../slices/userApiSlice";

const SearchScreen = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  let recentSearches =
    JSON.parse(localStorage.getItem("recentSearches"))?.sort(
      (b, a) => new Date(a.searchedAt) - new Date(b.searchedAt)
    ) || [];

  const navigate = useNavigate();

  const { data: users, isLoading, error } = useGetSearchUsersQuery();

  const handleSearchResult = (user) => {
    recentSearches.push({ ...user, searchedAt: new Date() });
    // let uniqueRecentSearches = recentSearches.filter((item, index) => {
    //   return index === recentSearches.findIndex((obj) => obj._id === item._id);
    // });
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(recentSearches.slice(-3))
    );
    navigate(`/user/${user.username}`);
  };
  return (
    <>
      <div className={styles["container"]}>
        <SideNavbar search />
        <div className={styles["main"]}>
          <h1 className={styles["main__title"]}>Search</h1>
          <div className={styles["search-box"]}>
            <input
              type="text"
              placeholder="Search..."
              className={styles["search-box__input"]}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setSearchResults(
                  users.filter((user) => user.username.includes(e.target.value))
                );
              }}
            />
            {input.length > 0 && (
              <ul className={styles["search-box__results"]}>
                {searchResults.map((user) => (
                  <li
                    key={user._id}
                    className={styles["search-box__result"]}
                    onClick={() => handleSearchResult(user)}
                  >
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className={styles["search-box__image"]}
                    />
                    <div className={styles["search-box__details"]}>
                      <p className={styles["search-box__name"]}>{user.name}</p>
                      <p className={styles["search-box__username"]}>
                        @{user.username}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className={styles["main__text"]}>Recent searches:</p>
          <div className={styles["search-history"]}>
            {recentSearches.map((user) => (
              <UserCard
                key={user._id}
                name={user.name}
                username={user.username}
                image={user.avatar}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchScreen;
