import { useSelector } from "react-redux";

function AuthorizedOnly({ children }) {
  const { logedInUser } = useSelector((state) => state.auth);
  if (logedInUser?.role !== "admin") {
    return null;
  }
  return <>{children}</>;
}

export default AuthorizedOnly;
