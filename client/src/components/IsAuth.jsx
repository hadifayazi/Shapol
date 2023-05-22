import { Navigate } from "react-router-dom";
import { userApi } from "../store/api/userApi";

const IsAuth = ({ children }) => {
  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });
  console.log(user);
  if (
    !user ||
    JSON.parse(
      localStorage.getItem("user") === null ||
        !JSON.parse(localStorage.getItem("user"))
    )
  ) {
    return <Navigate to="/" />;
  }
  return children;
};
export default IsAuth;
