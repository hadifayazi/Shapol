import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};
export default IsAuth;
