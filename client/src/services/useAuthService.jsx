import { useDispatch } from "react-redux";
import axiosInstance from "./axiosInstance";
import { setIsLogin } from "../store/authSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function useAuthService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = async (creds) => {
    try {
      const result = await axiosInstance.post(`/auth/login`, creds);
      if (result.status == 200) {
        toast.success("LogedIn Successfuly");
        dispatch(setIsLogin(true));
        localStorage.setItem("token", result.data.token);
        sessionStorage.setItem(
          "_userDetails",
          JSON.stringify(result.data.user)
        );
        navigate("/", { replace: true });
        return result.data;
      }
    } catch (error) {
      toast.error("Error occur during login");
      console.error("Error occur during login", error);
      throw error;
    }
  };

  const logOutUser = async () => {
    try {
      localStorage.removeItem("token");
      const result = await axiosInstance.put(`/auth/logout`);
      dispatch(setIsLogin(false));
      return result.data;
    } catch (error) {
      console.error("Error occur during login", error);
      throw error;
    }
  };
  return { logOutUser, loginUser };
}

export default useAuthService;
