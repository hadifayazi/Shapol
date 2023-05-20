import { useGetMeQuery } from "../store/api/authApi";
import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
  const { data } = useGetMeQuery();
  if (!data) {
    return <Navigate to="/" />;
  }
  return children;
};
export default IsAuth;
