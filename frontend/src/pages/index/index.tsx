import { Link } from "react-router-dom";
import UserStats from "../../components/UserStats/UserStats";
import { useUser } from "../../hooks/useUser";
import { useLogout } from "../../hooks/useLogout";

export function Index() {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <div>
      <h1>Random Character Selector</h1>

      {user ? (
        <div>
          <p>Logged In User: {JSON.stringify(user)}</p>
          <Link to={`/user/${user.uid}`}>Profile</Link>
          <Link to="#" onClick={logout}>
            Logout
          </Link>

          <UserStats userId={user.uid} />
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Create Account</Link>
        </div>
      )}
      <Link to="/agents">Valorant</Link>
      <Link to="/heroes">Heroes of the Storm</Link>
      <Link to="/legends">League of Legends</Link>
      <Link to="/stats">Show Stats</Link>
    </div>
  );
}
