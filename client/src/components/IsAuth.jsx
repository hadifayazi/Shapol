import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
  if (
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
