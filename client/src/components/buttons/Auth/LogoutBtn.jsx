import useIcon from "../../../hooks/useIcon";
import useAuthService from "../../../services/useAuthService";

function LogoutBtn({ hideText = false, className }) {
  const icons = useIcon();
  const { logOutUser } = useAuthService();

  const handleLogout = async () => {
    await logOutUser();
  };
  return (
    <button
      className={`flex justify-start items-center gap-3 text-red-500 opacity-70 hover:opacity-100  p-2 rounded-lg cursor-pointer ${className}`}
      onClick={handleLogout}
    >
      <span>{icons["logout"]}</span>
      {hideText && <span>Logout</span>}
    </button>
  );
}

export default LogoutBtn;
