import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useLogout } from "../../hooks/useLogout";
import "./index.css";

export function Index() {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <main>
      <h1>Random Character Selector</h1>

      <div className="container">
        {user ? (
          <>
            <div className="btn-group">
              <Link className="link-btn" to={`/user/${user.uid}`}>
                Profile
              </Link>
              <Link className="link-btn" to="#" onClick={logout}>
                Logout
              </Link>
            </div>
          </>
        ) : (
          <div className="btn-group">
            <Link className="link-btn" to="/login">
              Login
            </Link>
            <Link className="link-btn" to="/register">
              Create Account
            </Link>
          </div>
        )}
        <Link className="link-btn" to="/agents">
          Valorant
        </Link>
        <Link className="link-btn" to="/heroes">
          Heroes of the Storm
        </Link>
        <Link className="link-btn" to="/legends">
          League of Legends
        </Link>
        <Link className="link-btn" to="/stats">
          Show Stats
        </Link>
      </div>
    </main>
  );
}
