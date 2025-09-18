import { useSelector } from "react-redux";
import ProfileMenuBox from "../menus/ProfileMenuBox";
import { useLocation } from "react-router";

function NavBar() {
  const { isLogin } = useSelector((state) => state.auth);
  const { state, pathname } = useLocation();

  return (
    <header className="w-full h-16 ">
      <nav className="flex justify-between items-center w-full h-full ">
        <div className="p-2 capitalize">
          {String(pathname).split("/")[1] && (
            <h1 className="text-xl font-semibold">
              {String(pathname).split("/")[1].split("_").join(" ")}
            </h1>
          )}
        </div>{" "}
        {isLogin && <ProfileMenuBox />}
      </nav>
    </header>
  );
}

export default NavBar;
