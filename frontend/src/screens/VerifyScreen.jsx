import { useParams } from "react-router-dom";
import { useGetVerifyQuery } from "../slices/userApiSlice";

const VerifyScreen = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetVerifyQuery(id);

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
