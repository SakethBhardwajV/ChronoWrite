import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useGetVerifyQuery } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const VerifyScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetVerifyQuery(id);

  useEffect(() => {
    dispatch(setCredentials({ ...data }));
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        data && <p>User is verified</p>
      )}
    </div>
  );
};

export default VerifyScreen;
