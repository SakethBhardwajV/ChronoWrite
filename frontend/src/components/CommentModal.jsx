import { useEffect, useRef, useState } from "react";
import styles from "../styles/CommentModal.module.css";
import Post from "./Post";
import { useAddCommentMutation } from "../slices/postApiSlice";
const CommentModal = ({ post, close }) => {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const textAreaRef = useRef(null);

  const [addComment] = useAddCommentMutation();

  const handleChange = (e) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addComment({ postID: post._id, content: text }).unwrap();
      setText("");
      setCharCount(0);
      console.log("comment created");
      close();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [text]);

  return (
    <div className={styles["modal__container"]}>
      <svg
        onClick={close}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={styles["modal__close"]}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 6L18 18"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className={styles["modal"]}>
        <Post
          className={styles["modal__post"]}
          content={post.content}
          details={post.user}
          stats={post}
          disable
        />
        <form className={styles["modal__form"]} onSubmit={submitHandler}>
          <textarea
            name="modal__input"
            placeholder="Post your reply"
            className={styles["modal__input"]}
            rows="1"
            value={text}
            onChange={handleChange}
            ref={textAreaRef}
          />
          <div className={styles["modal__footer"]}>
            <span
              className={`${styles["modal__counter"]} ${
                charCount > 200 ? styles["modal__counter--limit"] : ""
              }`}
            >
              {charCount}/200
            </span>
            <button
              type="submit"
              className={styles["modal__button"]}
              disabled={!charCount > 0}
            >
              Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
