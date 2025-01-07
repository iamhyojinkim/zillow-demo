import { login, logout } from "./api/firebase";
import { useProperty } from "./api/Context";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useProperty();

  const handleLogin = async () => {
    const loginUser = await login();
    setUser(loginUser);
  };
  const handleLogout = () => logout().then(setUser);
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <>
      <nav>
        <div className="zillow" onClick={handleClick}>
          Zillow
        </div>
        <div className="right-items">
          <div>{user ? user.displayName : ""}</div>
          {!user && (
            <div className="login" onClick={handleLogin}>
              Login
            </div>
          )}
          {user && (
            <div className="login" onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
