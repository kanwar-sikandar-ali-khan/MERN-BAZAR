import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = ({ children }) => {
  const { user,adminToken } = useSelector((state) => state.authReducer);
  console.log(user)
  return adminToken ? children : <Navigate to="/auth/admin-login" />;
};
export default Private;
